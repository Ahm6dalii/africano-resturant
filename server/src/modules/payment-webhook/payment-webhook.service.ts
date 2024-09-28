import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { Cart } from 'src/core/schemas/cart.schema';
import { Order } from 'src/core/schemas/order.schema';
import { NotifictionsGateway } from '../notifictions/notifictions.gateway';
import { NotifictionsService } from '../notifictions/notifictions.service';
import { Admin } from 'src/core/schemas/admin.schema';

@Injectable()
export class PaymentWebhookService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    private _jwtservice: JwtService
    , private readonly httpService: HttpService,
    private readonly notificationGateway: NotifictionsGateway
    , private readonly notificationService: NotifictionsService,
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
  ) { }
  private apiKey = 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RrME1qRTJMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuYjN4MXVld2hlTjBpdld0bUtUbndrV2VmVnU1akNEcHhnUVYzNzVXZUhuQnM4SlAwekZiYnRObFh0cVFaaTJndzNGWW8zOW9EWnlrd2lsY1VxWjdGWWc=';
  private baseUrl = 'https://accept.paymob.com/api';


  async handleSuccessfulPayment(token, id, res, redirectURL,afterRedirectURL, req): Promise<void> {
    const decoded = this._jwtservice.verify(token, { secret: "mo2" });
    await this.removeAllCartItems(token)
    return await this.createPaymentIntention(token, id, res, redirectURL,afterRedirectURL,req)
    // return res.redirect('https://example.com/success');

  }


  async removeAllCartItems(token): Promise<void> {
    const decoded = this._jwtservice.verify(token, { secret: "mo2" });

    const cart = await this.cartModel.findOne({ userId: decoded.userId });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.items = [];
    cart.totalPrice = 0;
    return await this.cartModel.findByIdAndUpdate(cart._id, { $set: { items: [], totalPrice: 0 } }, { new: true });
  }


  async createPaymentIntention(token, id, res, redirectURL,afterRedirectURL, req): Promise<any> {
    const decoded = this._jwtservice.verify(token, { secret: "mo2" });
    const mytoken = await this.authenticate()
    const apiUrl = 'https://accept.paymob.com/api/acceptance/transactions';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': mytoken
    };
    // ht7toooo hena y mohamed hassan >----  
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${apiUrl}/${id}`, { headers })
      );
      const { billing_data, order, amount_cents } = response.data
      const updatedOrder = this.splitSizeFromName(order.items)
      const myOrder = await this.orderModel.insertMany({ userId: decoded.userId, billing_data, intention_detail: { items: updatedOrder, total: amount_cents } })




      const orderr = myOrder[0];
      const users = await this.adminModel.find().exec();
      const userIds = users.map(user => user._id);
      const notifications = {
        users: userIds,
        type: 'Order',
        relatedId: orderr._id,
        message: `A new Order was Ordered: by ${orderr?.billing_data?.first_name}`,
      }

      await this.notificationService.createNotification(notifications);
      this.notificationGateway.sendOrderNotificationToAdmin(notifications);
      this.notificationGateway.sendNewOrderToAll(myOrder);



      const urlParts = redirectURL.split('/');
      const desiredPath = '/' + urlParts.slice(-1)[0];
      const newUrl =afterRedirectURL + desiredPath;

      return res.redirect(newUrl);

    } catch (error) {
      console.error('Error creating Paymob intention:', error);
      throw error;
    }
  }


  async authenticate() {
    const response = await axios.post(`${this.baseUrl}/auth/tokens`, {
      api_key: this.apiKey,
    });
    return response.data.token;
  }

  splitSizeFromName(products) {
    return products.map(product => {
      console.log(product, 'sdsdsdaasdb7b7b7b');
      const [name, size] = product.name.split(' - ');
      return {
        name,
        size,
        description: product.description,
        amount_cents: product.amount_cents,
        quantity: product.quantity,
        image: product.image
      };
    });
  };
}
