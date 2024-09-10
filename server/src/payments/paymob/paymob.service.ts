import { HttpService } from '@nestjs/axios';
import { Injectable, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { Order } from 'src/core/schemas/order.schema';

@Injectable()
export class PaymobService {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>,private readonly httpService: HttpService) {}

    async createPaymentIntention(body,param): Promise<any> {
      console.log(param);
      
      const apiUrl = 'https://accept.paymob.com/v1/intention/';
      const headers = {
        'Content-Type': 'application/json',
        'Authorization':"Token egy_sk_test_1c71ccc75a2761762253e30052d7196cabe79a9c80aa8340c5f3fe824603d63d"
      };
      body.redirection_url=`${body.redirection_url}/allOrders`
      console.log(body.redirection_url);
      
      
     const data=body
  
  
      try {
        const response = await firstValueFrom(
          this.httpService.post(`${apiUrl}`, data, { headers })
        );
        const {intention_detail,billing_data}=response.data
        const myorder=await this.orderModel.insertMany({userId:'123',intention_detail})
        console.log(myorder);
        
        return response.data;
      } catch (error) {
        console.error('Error creating Paymob intention:', error);
        throw error;
      }
    }
  

  
    
}
