import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayDisconnect, OnGatewayConnection } from '@nestjs/websockets';
import { NotifictionsService } from './notifictions.service';
import { Server, Socket } from 'socket.io';
import { Admin } from 'src/core/schemas/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Chat } from 'src/core/schemas/chat.schema';
import { User } from 'src/core/schemas/user.schema';

@WebSocketGateway()
export class NotifictionsGateway {
  private server: Server
  private clients = new Map<string, Socket>();
  constructor(private readonly notifictionsService: NotifictionsService,
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Chat.name) private chatModel: Model<Chat>
  ) {

  }


  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);

    for (const [userId, socket] of this.clients.entries()) {
      if (socket.id === client.id) {
        this.clients.delete(userId);
        break;
      }
    }
  }


  @SubscribeMessage('register')
  handleRegister(@MessageBody() { userId, adminId }: { userId: string; adminId: string }, @ConnectedSocket() client: Socket) {
    if (userId) {
      this.clients.set(userId, client);
      console.log(`User userId ${userId} connected`);
    }
    if (adminId) {
      this.clients.set(adminId, client);
      console.log(`Admin adminId ${adminId} connected`);
    }
  }


  @SubscribeMessage('getNotifiction')
  async handleGetNotifications(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    const notifications = await this.notifictionsService.getNotifications(userId);
    client.emit('notifications', notifications);
  }

  async sendNotificationToAll(notification: any) {
    this.server.emit('notifications', notification);
  }
  async sendNewReviewToAll(review: any) {
    this.server.emit('newReview', review);
  }
  async sendNewOrderToAll(myOrder: any) {
    this.server.emit('newOrder', myOrder);
  }
  async sendOrderNotificationToAdmin(notification: any) {
    const adminUsers = await this.adminModel.find().exec();

    console.log(notification, "notification notification notification");
    console.log(`Number of admin users found: ${adminUsers.length}`);

    adminUsers.forEach(adminUser => {
      const client = this.clients.get(adminUser._id.toString());

      if (client) {
        client.emit('adminNotification', notification);
        console.log(`Notification sent to admin user: ${adminUser._id}`);
      } else {
        console.error(`No client found for admin user: ${adminUser._id}`);
      }
    });
  }

  async sendUpdatedOrderToUser(userId: string, updatedOrder: any, notification: any) {
    const client = this.clients.get(userId);

    if (client) {
      console.log(`Sending updated order to user: ${userId}, Client ID: ${client.id}`);
      client.emit('updatedOrder', updatedOrder);
      client.emit('userNotification', notification)
    } else {
      console.error(`Client not found for userId: ${userId}`);
      console.error(`Client not found for userId: ${this.clients}`);
    }
  }


  // @SubscribeMessage('getNewReview')
  // handleGetNewReview(@ConnectedSocket() client: Socket) {
  //   console.log('Client connected for new reviews');
  // }


  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() { userId, adminId, message }: { userId: string; adminId: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const userObjectId = new mongoose.Types.ObjectId(userId); // Create ObjectId for userId once
      const adminObjectId = adminId ? new mongoose.Types.ObjectId(adminId) : null; // Create ObjectId for adminId if it exists

      let chat = await this.chatModel.findOne({ user: new mongoose.Types.ObjectId(userId) });

      if (!chat) {
        chat = new this.chatModel({
          user: userObjectId,
          messages: [],
        });
      } else if (!Array.isArray(chat.messages)) {
        chat.messages = [];
      }

      const newMessage = {
        text: message,
        sender: adminId ? adminObjectId : userObjectId,
        senderModel: adminId ? 'Admin' : 'User',
        receiver: adminId ? userObjectId : adminObjectId,
        receiverModel: adminId ? 'User' : 'Admin',
        createdAt: new Date(),
        read: false,
      };

      chat.messages.push(newMessage);
      await chat.save();


      const populatedChat = await this.chatModel.findById(chat._id)
        .populate('user', 'name image _id')
        .populate('messages.sender', 'name username image phone _id')
        .populate('messages.receiver', 'name username image phone _id');

      if (!populatedChat) {
        throw new Error('Failed to populate chat');
      }

      const populatedNewMessage = populatedChat.messages[populatedChat.messages.length - 1];

      console.log('Populated new message:', populatedNewMessage);

      const targetClient = this.clients.get(userId);
      if (targetClient) {
        targetClient.emit('newMessage', populatedNewMessage);
      }

      if (adminId) {
        const adminClient = this.clients.get(adminId);
        if (adminClient) {
          adminClient.emit('newMessage', populatedNewMessage);
        }
      } else {
        const adminUsers = await this.adminModel.find().exec();
        adminUsers.forEach(adminUser => {
          const client = this.clients.get(adminUser._id.toString());
          if (client) {
            client.emit('newMessage', populatedNewMessage);
          }
        });
      }

      return populatedNewMessage;
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      throw error;
    }
  }




  // @SubscribeMessage('getMessages')
  // async handleGetMessages(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
  //   const chat = await this.chatModel.findOne({ user: userId }).populate('messages.sender').populate('messages.receiver').exec();
  //   const message = client.emit('chatMessages', chat.messages);
  //   console.log(chat, "message let see if it works");

  // }
  afterInit(server: Server) {
    this.server = server;
  }

}
