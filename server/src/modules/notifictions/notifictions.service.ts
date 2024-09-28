import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from 'src/core/schemas/chat.schema';
import { Notifiction } from 'src/core/schemas/notifiction.schema';
import { User } from 'src/core/schemas/user.schema';


@Injectable()
export class NotifictionsService {
  constructor(@InjectModel(Notifiction.name) private readonly notifictionModel: Model<Notifiction>
    , @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    @InjectModel(User.name) private userModel: Model<User>) { }



  async createNotification(notificationDto: any) {
    const notification = {
      ...notificationDto,
      readStatus: notificationDto.users.map(userId => ({ userId, read: false }))
    };
    return this.notifictionModel.create(notification);
  }

  async getNotifications(userId: string) {
    const notifications = await this.notifictionModel.find({
      'readStatus.userId': userId
    }).sort({ createdAt: -1 }).exec();
    return notifications.map(notification => {
      const userReadStatus = notification.readStatus.find(status => status.userId.equals(userId));
      return {
        ...notification.toObject(),
        read: userReadStatus ? userReadStatus.read : false,
        users: undefined,
        readStatus: undefined
      };
    });
  }



  async markAsRead(userId: string) {
    return this.notifictionModel.updateMany(
      { "readStatus.userId": userId, "readStatus.read": false },
      { $set: { "readStatus.$.read": true } }
    ).exec();
  }

  async getUsersChat(userId: string) {
    return this.chatModel.findOne({ user: userId }).populate('user', 'name image phone _id')
      .populate('messages.sender', 'name username image phone _id')
      .populate('messages.receiver', 'name username image phone _id');
  }
  async updateMessage(messageId: string) {
    return this.chatModel.findOneAndUpdate(
      { "messages._id": messageId },
      { $set: { "messages.$.read": true } },
      { new: true }
    )
      .populate('user', 'name image -_id')
      .populate('messages.sender', 'name username image phone _id')
      .populate('messages.receiver', 'name username image phone _id');
  }


  async getAllChats() {
    return this.chatModel.find().populate('user', 'name image phone -_id')
      .populate('messages.sender', 'name username image phone -_id')
      .populate('messages.receiver', 'name username image phone -_id');
  }




  async getUnreadChats() {
    const chats = await this.chatModel.find({
      messages: {
        $elemMatch: {
          read: false,
          senderModel: { $ne: "Admin" } // Ensure the message is not from an Admin
        }
      }
    })
      .populate('user', 'name image phone  _id')
      .populate('messages.sender', 'name username image phone _id')
      .populate('messages.receiver', 'name username image phone _id')
      .lean();  // Use lean() for better performance as we're not modifying the documents

    // Filter unread messages for each chat
    const chatsWithUnreadMessages = chats.map(chat => ({
      ...chat,
      messages: chat.messages.filter(message => message.read === false && message.senderModel !== "Admin")
    }));

    return chatsWithUnreadMessages;
  }
}
