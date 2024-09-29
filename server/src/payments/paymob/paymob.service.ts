import { HttpService } from '@nestjs/axios';
import { Injectable, Body, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { Admin } from 'src/core/schemas/admin.schema';
import { Cart } from 'src/core/schemas/cart.schema';
import { Delivery } from 'src/core/schemas/delivery.schema';
import { Order } from 'src/core/schemas/order.schema';
import { NotifictionsGateway } from 'src/modules/notifictions/notifictions.gateway';
import { NotifictionsService } from 'src/modules/notifictions/notifictions.service';

@Injectable()
export class PaymobService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(Delivery.name) private deliveryModel: Model<Delivery>,
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private _jwtservice: JwtService
    , private readonly httpService: HttpService
    , private readonly notificationGateway: NotifictionsGateway
    , private readonly notificationService: NotifictionsService,
    private configService: ConfigService) { }

  async createPaymentIntention(body, param, token): Promise<any> {

    const decoded = this._jwtservice.verify(token, { secret: "mo2" });


    const myCart = await this.cartModel.findOne({ userId: decoded.userId })


    // const {items:{items,size,...paymobobj}}=myCart
    // console.log(myCart,'dfdffdfdfdsfdsffsdfdsaaaaaaaaaaaaaaaaaaaaaa');


    const deliveyPrice = await this.deliveryModel.findOne()


    if (!myCart) {
      throw new HttpException('no cart exist', HttpStatus.NOT_FOUND)
    }
    console.log("Received payment method:", body.payment_method);


    if (body.payment_method === 'cash') {
      const orders = await this.orderModel.insertMany({
        userId: decoded.userId,
        billing_data: body.billing_data,
        intention_detail: {
          items: myCart.items,
          total: myCart.totalPrice,
        },
        payment_method: 'cash',
      })


      const order = orders[0];
      const users = await this.adminModel.find().exec();
      const userIds = users.map(user => user._id);
      const notifications = {
        users: userIds,
        type: 'Order',
        relatedId: order._id,
        message: `A new Order was Ordered: by ${order?.billing_data?.first_name}`,
      }
      await this.notificationService.createNotification(notifications);
      this.notificationGateway.sendOrderNotificationToAdmin(notifications);
      this.notificationGateway.sendNewOrderToAll(orders);


      await this.removeAllCartItems(token);

      return { success: true, orders };
    } else {

      const apiUrl = 'https://accept.paymob.com/v1/intention/';
      const headers = {
        'Content-Type': 'application/json',
        // 'Authorization': this.configService.get<string>('PAYMOB_SECRET')
        'Authorization': "Token egy_sk_test_1c71ccc75a2761762253e30052d7196cabe79a9c80aa8340c5f3fe824603d63d"

      };
      body.redirection_url = `${body.redirection_url}/payment-webhook/?token=${token}&afterRedirectURL=${body.after_redirect_url}&redirectURL=${body.redirection_url}/allOrder`

      let allItems = myCart.items.map(item => item)
      const updatedProducts = (products) => {
        return products.map(product => ({
          name: `${product?.name?.en} - ${product?.size}`,
          description: `${product?.description?.en} `,
          amount: Math.ceil(product.amount * 100),
          quantity: product.quantity,
          image: product.image
        }));
      }
      const paymobData = updatedProducts(allItems)
      console.log(paymobData, 'updatedProductsupdatedProducts');

  

      const delivery = {
        "name": "delivery",
        "amount": Number(deliveyPrice.price) * 100,
        "description": "Delivery Price",
        "quantity": 1,
        "image": "https://res.cloudinary.com/dbifogzji/image/upload/v1727203854/Africano/u28vlatvsblmemghbdxl.png"
      }

      const data = {
        "amount": (myCart.totalPrice * 100) + (Number(deliveyPrice.price) * 100),
        "currency": "EGP",
        "expiration": 5800,
        "payment_methods": [4828775],
        "items": [...paymobData, delivery],
        ...body,
      }
      console.log(data);

      try {
        const response = await firstValueFrom(
          this.httpService.post(`${apiUrl}`, data, { headers })
        );

        const { intention_detail } = response.data

        intention_detail.amount /= 100;
        intention_detail.items.forEach(item => {
          item.amount /= 100;
        });
  
        return response.data;
      } catch (error) {
        console.error('Error creating Paymob intention:', error);
        throw error;
      }
    }
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

}
