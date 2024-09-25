import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayDisconnect, OnGatewayConnection } from '@nestjs/websockets';
import { NotifictionsService } from './notifictions.service';
import { Server, Socket } from 'socket.io';
import { Admin } from 'src/core/schemas/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@WebSocketGateway()
export class NotifictionsGateway {
  private server: Server
  private clients = new Map<string, Socket>();
  constructor(private readonly notifictionsService: NotifictionsService,
    @InjectModel(Admin.name) private adminModel: Model<Admin>
  ) { }


  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
    // Remove the client from the map when they disconnect
    for (const [userId, socket] of this.clients.entries()) {
      if (socket.id === client.id) {
        this.clients.delete(userId);
        break;
      }
    }
  }


  @SubscribeMessage('register')
  handleRegister(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    this.clients.set(userId, client);
    console.log(`User ${userId} connected`);
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

    adminUsers.forEach(adminUser => {
      const client = this.clients.get(adminUser._id.toString());
      if (client) {
        client.emit('adminNotification', notification);
        console.log(`Notification sent to admin user: ${adminUser._id}`);
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
  afterInit(server: Server) {
    this.server = server;
  }
}
