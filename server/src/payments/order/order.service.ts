import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { Order } from 'src/core/schemas/order.schema';
import { LogService } from 'src/modules/log/log.service';
import { NotifictionsGateway } from 'src/modules/notifictions/notifictions.gateway';
import { NotifictionsService } from 'src/modules/notifictions/notifictions.service';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>, private _jwtservice: JwtService,
    private readonly notificationGateway: NotifictionsGateway, private readonly notificationService: NotifictionsService,
    private logService: LogService) { }



  async allOrder(search, limit, page) {


    const skip = (page - 1) * limit;

    const searchCondition = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};
    const myOrder = await this.orderModel.find(searchCondition)
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
        users: [userId],
        type: 'order_status_updated',
        relatedId: myOrder._id,
        message: `Your Order is: ${myOrder.status}`,
      }
      await this.notificationService.createNotification(notifications);
      // this.notificationGateway.sendNotificationToAll(notifications);
      this.notificationGateway.sendUpdatedOrderToUser(userId, myOrder, [notifications]);
      return myOrder
    } else {
      return 'no order exist';
    }
  }
  async deleteOrder(id, adminId: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const result = await this.orderModel.findByIdAndDelete(id);

    await this.logService.createLog('Deleted order ', adminId);
  }




  async getTotalEarningsByPeriod(startDate: Date, endDate: Date): Promise<number> {
    const result = await this.orderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          totalOnline: {
            $sum: {
              $cond: [
                { $eq: ["$payment_method", "online"] },
                { $divide: ["$intention_detail.total", 100] },
                0
              ],
            },
          },
          totalCash: {
            $sum: {
              $cond: [
                { $eq: ["$payment_method", "cash"] },
                "$intention_detail.total",
                0
              ],
            },
          },
        },
      },
    ]);

    if (result.length > 0) {
      const onlineTotal = result[0].totalOnline.toFixed(2);
      const cashTotal = result[0].totalCash.toFixed(0);
      const totalEarnings = parseFloat(onlineTotal) + parseFloat(cashTotal);
      return totalEarnings;
    }

    return 0;
  }


  async getWeeklyEarnings(): Promise<number> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    return this.getTotalEarningsByPeriod(startDate, new Date());
  }

  async getMonthlyEarnings(): Promise<number> {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    return this.getTotalEarningsByPeriod(startDate, new Date());
  }

  async getYearlyEarnings(): Promise<number> {
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    return this.getTotalEarningsByPeriod(startDate, new Date());
  }
  async getTopSoldItemsByPeriod(startDate: Date, endDate: Date, limit: number = 10) {
    const result = await this.orderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      { $unwind: "$intention_detail.items" },
      {
        $match: {
          "intention_detail.items.name": { $ne: "delivery" },
        },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$payment_method", "online"] },
              "$intention_detail.items.name",
              "$intention_detail.items.name.en"
            ]
          },
          totalSold: { $sum: "$intention_detail.items.quantity" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: limit },
    ]);

    return result.length > 0 ? result : [];
  }

  async getTopSoldItemsWeekly(limit: number = 10) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    return this.getTopSoldItemsByPeriod(startDate, new Date(), limit);
  }

  async getTopSoldItemsMonthly(limit: number = 10) {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    return this.getTopSoldItemsByPeriod(startDate, new Date(), limit);
  }

  async getTopSoldItemsYearly(limit: number = 10) {
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    return this.getTopSoldItemsByPeriod(startDate, new Date(), limit);
  }

  async countPaymentMethodsByPeriod(startDate: Date, endDate: Date) {
    const result = await this.orderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: "$payment_method",
          count: { $sum: 1 },
        },
      },
    ]);

    return result.length > 0 ? result : [];
  }

  async getWeeklyPaymentMethodCounts() {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    return this.countPaymentMethodsByPeriod(startDate, new Date());
  }

  async getMonthlyPaymentMethodCounts() {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    return this.countPaymentMethodsByPeriod(startDate, new Date());
  }

  async getYearlyPaymentMethodCounts() {
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    return this.countPaymentMethodsByPeriod(startDate, new Date());
  }
}
