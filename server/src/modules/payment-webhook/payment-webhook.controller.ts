import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { PaymentWebhookService } from './payment-webhook.service';

@Controller('payment-webhook')
export class PaymentWebhookController {
  constructor(private readonly paymentWebhookService: PaymentWebhookService) { }

  @Get()
  async handleWebhook(@Req() req: any, @Query() query: any, @Res() res: any) {
    const event = req.body;

    // console.log(query);
    const { id, pending, success, order, hmac, token, redirectURL,afterRedirectURL } = query

    if (query.success) {


      return await this.paymentWebhookService.handleSuccessfulPayment(token, id, res, redirectURL,afterRedirectURL,req);
    }


    res.status(200).send(query);
  }
  @Post()
  async handlePost(@Req() req: any, @Res() res: any) {


  }
}
