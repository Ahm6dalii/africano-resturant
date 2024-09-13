import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/core/schemas/order.schema';

@Injectable()
export class OrderService 
{
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>,private _jwtservice:JwtService) {}


    async allOrder(){
        const myOrder= await this.orderModel.find()
        if(myOrder)
        {
          return  myOrder
        }else{
          return 'no order exist';
        }
      }
     async userOrders(token){
      const decoded=this._jwtservice.verify(token,{secret:"mo2"});
        const myOrder= await this.orderModel.find({
          userId:decoded.userId})
        if(myOrder)
        {
          return  myOrder
        }else{
          return 'no order exist';
        }
      }
}