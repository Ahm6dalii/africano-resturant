import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly _paymentService: PaymentService) {}


  @Get()
  getHello() {
    return this._paymentService.getHello();
  }

  @Post()
  async createPayment(@Body() orderData: any) {
    const authToken = await this._paymentService.authenticate();
    console.log(authToken,'ewewewqw');
    
    const order = await this._paymentService.createOrder(authToken, orderData);
    console.log(order,'ssss');
    
    const paymentKey = await this._paymentService.generatePaymentKey(authToken, {
      amount_cents: order.amount_cents,
      expiration : 3600,
      currency: 'EGP',
      order_id: order.id,
      integration_id: 4828775

      // Additional payment data here...
    });
const paymentLink=`https://accept.paymob.com/api/acceptance/iframes/866784?payment_token=${paymentKey.token}`
    return {paymentLink,paymentKey, order };
  }

}
