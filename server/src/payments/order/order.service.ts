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



  async allOrder(search,limit,page) {
   
   
    const skip = (page - 1) * limit;
    
    const searchCondition = search
      ? { name: { $regex: search, $options: 'i' } } 
      : {}; 
    const myOrder= await this.orderModel.find(searchCondition)
        .skip(skip)
        .limit(limit)
        .exec();

    const total = await this.orderModel
        .find(searchCondition)
        .countDocuments();

    const totalPages = Math.ceil(total / limit);

  
    if (myOrder) {
      return {
        total,
        totalPages,
        page,
        limit,
        data: myOrder,
      };
      
    } else {
      return 'no order exist';
    }


  }
  async userOrders(token, search, limit, page) {
    try {
      const decoded = this._jwtservice.verify(token, { secret: "mo2" });
      const skip = (page - 1) * limit;
      
      // Always include the userId in the search condition
      const searchCondition = {
        userId: decoded.userId, 
        ...(search ? { name: { $regex: search, $options: 'i' } } : {})
      };
  
      const myOrder = await this.orderModel.find(searchCondition)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .exec();
  
      const total = await this.orderModel
        .find(searchCondition)
        .countDocuments();
  
      const totalPages = Math.ceil(total / limit);
  
      return {
        total,
        totalPages,
        page,
        limit,
        data: myOrder,
      };
    } catch (error) {
      throw new Error('Error fetching orders: ' + error.message);
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
