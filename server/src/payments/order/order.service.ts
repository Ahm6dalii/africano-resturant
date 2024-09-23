import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from 'src/core/schemas/order.schema';
import { NotifictionsGateway } from 'src/modules/notifictions/notifictions.gateway';
import { NotifictionsService } from 'src/modules/notifictions/notifictions.service';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>, private _jwtservice: JwtService,
    private readonly notificationGateway: NotifictionsGateway, private readonly notificationService: NotifictionsService) { }



  async allOrder() {
    const myOrder = await this.orderModel.find().sort({ _id: -1 })
    if (myOrder) {
      return myOrder
    } else {
      return 'no order exist';
    }
  }
  async userOrders(token) {
    console.log(token, "token")
    const decoded = this._jwtservice.verify(token, { secret: "mo2" })
    const myOrder = await this.orderModel.find({
      userId: decoded.userId
    }).sort({ _id: -1 })
    if (myOrder) {
      return myOrder
    } else {
      return 'no order exist';
    }
  }

  async getOrdersByStatus(status: string) {
    const myOrder = await this.orderModel.find({ status }).sort({ _id: -1 })
    if (myOrder) {
      return myOrder
    } else {
      return 'no order exist';
    }
  }
  async updateOrderStatus(id, body: any) {
    const { status } = body
    const myOrder = await this.orderModel.findByIdAndUpdate(id, { status }, { new: true }).sort({ _id: -1 })
    if (myOrder) {
      const userId = myOrder.userId.toString();
      const notifications = {
        user: userId,
        type: 'order_status_updated',
        relatedId: myOrder._id,
        message: `Your Order is: ${myOrder.status}`,
      }
      await this.notificationService.createNotification([notifications]);
      // this.notificationGateway.sendNotificationToAll(notifications);
      this.notificationGateway.sendUpdatedOrderToUser(userId, myOrder, [notifications]);
      return myOrder
    } else {
      return 'no order exist';
    }
  }

}
