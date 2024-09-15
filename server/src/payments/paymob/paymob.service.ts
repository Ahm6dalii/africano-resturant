import { HttpService } from '@nestjs/axios';
import { Injectable, Body, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { Cart } from 'src/core/schemas/cart.schema';
import { Delivery } from 'src/core/schemas/delivery.schema';
import { Order } from 'src/core/schemas/order.schema';

@Injectable()
export class PaymobService {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>,
     @InjectModel(Cart.name) private cartModel: Model<Cart>,
     @InjectModel(Delivery.name) private deliveryModel: Model<Delivery>,
     private _jwtservice:JwtService
    ,private readonly httpService: HttpService) {}

    async createPaymentIntention(body,param,token): Promise<any> {
      console.log(body);
      
      const decoded= this._jwtservice.verify(token,{secret:"mo2"});
      console.log(decoded);
      
      const myCart= await this.cartModel.findOne({userId:decoded.userId})
      // const {items:{items,size,...paymobobj}}=myCart
      console.log(myCart);
      
      const deliveyPrice=await this.deliveryModel.findOne()
      
      
      if(!myCart){
        throw new HttpException('no cart exist',HttpStatus.NOT_FOUND)
      }
     
      
      const apiUrl = 'https://accept.paymob.com/v1/intention/';
      const headers = {
        'Content-Type': 'application/json',
        'Authorization':"Token egy_sk_test_1c71ccc75a2761762253e30052d7196cabe79a9c80aa8340c5f3fe824603d63d"
      };
      body.redirection_url=`${body.redirection_url}/payment-webhook/?token=${token}&redirectURL=${body.redirection_url}/allOrder`
      
      let allItems=myCart.items.map(item=> item) 
      allItems.forEach(item=> {item.description=item.description['en'] ,item.name=item.name['en']})
    console.log(allItems);
    
      allItems.forEach(item=>item.amount = Math.ceil(item.amount))
      allItems.forEach(item=>item.amount*=100)
      
      const delivery={
               "name": "delivery",
              "amount":Number(deliveyPrice.price)*100,
              "description": "Delivery Price",
              "quantity": 1,
              "image":"http://google.com"
      }
        
     const data={
         "amount": (myCart.totalPrice*100)+(Number(deliveyPrice.price)*100),
      "currency": "EGP",
        "expiration": 5800,
       "payment_methods": [4828775],
       "items":[...allItems,delivery],
    ...body,
     }
     console.log(data);
     
     
  
      try {
        console.log('dsdsdsd')
        
        const response = await firstValueFrom(
          this.httpService.post(`${apiUrl}`, data, { headers })
        );
        console.log(response);
        
        const {intention_detail}=response.data
        
        intention_detail.amount /= 100;
        intention_detail.items.forEach(item => {
            item.amount /= 100;
        });
        // const myorder=await this.orderModel.insertMany({userId:decoded.userId,intention_detail})
        // this.removeAllCartItems(token)
        return response.data;
      } catch (error) {
        console.error('Error creating Paymob intention:', error);
        throw error;
      }
    }
  

    async removeAllCartItems(token): Promise<void> {
      const decoded=this._jwtservice.verify(token,{secret:"mo2"});
  
      const cart = await this.cartModel.findOne({ userId:decoded.userId });
      if (!cart) {
        throw new NotFoundException('Cart not found');
      }
    
      cart.items = [];
      cart.totalPrice=0;
      return await this.cartModel.findByIdAndUpdate(cart._id, {$set:{items:[],totalPrice:0}},{new:true});
    }
    
}
