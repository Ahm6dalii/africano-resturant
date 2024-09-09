import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaymentService {


    getHello(){
        return 'hello'
    }

    private apiKey = 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RrME1qRTJMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuYjN4MXVld2hlTjBpdld0bUtUbndrV2VmVnU1akNEcHhnUVYzNzVXZUhuQnM4SlAwekZiYnRObFh0cVFaaTJndzNGWW8zOW9EWnlrd2lsY1VxWjdGWWc=';
    private baseUrl = 'https://accept.paymob.com/api';
  
    async authenticate() {
      const response = await axios.post(`${this.baseUrl}/auth/tokens`, {
        api_key: this.apiKey,
      });
      return response.data.token;
    }
  
    async createOrder(authToken: string, orderData: any) {
        // console.log(orderData,'order data');
        // console.log(authToken,'authtoken');
        const data={
            "auth_token":authToken,
            ...orderData
        }
      const response = await axios.post(
        `${this.baseUrl}/ecommerce/orders`,
        data,
          );
        return response.data;
      }

      async generatePaymentKey(authToken: string, paymentData: any) {
        const data={
            "auth_token" :authToken,
       ...paymentData
        }
        const response = await axios.post(
          `${this.baseUrl}/acceptance/payment_keys`,
         data,
        );
        return response.data;
      }
    
}
