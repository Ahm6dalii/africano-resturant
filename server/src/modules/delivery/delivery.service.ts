import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Delivery } from 'src/core/schemas/delivery.schema';
import { NotifictionsGateway } from '../notifictions/notifictions.gateway';
import { NotifictionsService } from '../notifictions/notifictions.service';
import { User } from 'src/core/schemas/user.schema';

@Injectable()
export class DeliveryService {

    constructor(@InjectModel(Delivery.name) private deliveryModel: Model<Delivery>,
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly notificationService: NotifictionsService,
        private readonly notificationGateway: NotifictionsGateway) {
    }


    async updateDeliveyPrice(body) {
        const finded = await this.deliveryModel.find()
        const _id = finded[0]._id
        const Delivery = await this.deliveryModel.findOneAndUpdate({ _id }, { $set: { price: body.price } }, { new: true });

        const users = await this.userModel.find().exec();
        const userIds = users.map(user => user._id);

        const notifications = {
            users: userIds,
            type: 'Delivery_Changed',
            relatedId: Delivery._id,
            message: `The delivery price has changed to ${Delivery.price}`,
        }
        await this.notificationService.createNotification(notifications);
        this.notificationGateway.sendNotificationToAll(notifications);

        return { message: "price updated successFully", Delivery }
    }



    async getDeliveyPrice() {
        const Delivery = await this.deliveryModel.findOne()
        return Delivery
    }
}
