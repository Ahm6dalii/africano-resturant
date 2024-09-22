import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notifiction } from 'src/core/schemas/notifiction.schema';


@Injectable()
export class NotifictionsService {
  constructor(@InjectModel(Notifiction.name) private readonly notifictionModel: Model<Notifiction>) { }



  async createNotification(notificationDto: any) {
    return this.notifictionModel.create(notificationDto);
  }

  async getNotifications(userId: string) {
    return this.notifictionModel.find({ user: userId }).sort({ createdAt: -1 }).exec();
  }

  async markAsRead(userId: string) {
    return this.notifictionModel.updateMany({ user: userId,, read: false }, { read: true }, { new: true }).exec();
  }


}
