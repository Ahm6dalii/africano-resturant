import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/core/schemas/order.schema';

@Injectable()
export class OrderService 
{
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}


    async allOrder(){
        const myOrder= await this.orderModel.find()
        if(myOrder)
        {
          return  myOrder
        }else{
          return 'no order exist';
        }
      }
     async userOrders(body){
        const myOrder= await this.orderModel.find(body)
        if(myOrder)
        {
          return  myOrder
        }else{
          return 'no order exist';
        }
      }
}
