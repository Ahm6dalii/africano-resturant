import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { PaymentWebhookService } from './payment-webhook.service';

@Controller('payment-webhook')
export class PaymentWebhookController {
  constructor(private readonly paymentWebhookService: PaymentWebhookService) {}

  @Get()
  async handleWebhook(@Req() req: any,@Query() query: any, @Res() res: any) {
    const event = req.body;
    
    // console.log(query);
    const {id,pending,success,order,hmac,token,redirectURL}=query
    console.log('fdfssds');
    
  if(query.success)
  {
    console.log('aaaaaaaa');
    
    return await this.paymentWebhookService.handleSuccessfulPayment(token,id,res,redirectURL);
  }


    res.status(200).send(query);
  }
  @Post()
  async handlePost(@Req() req: any, @Res() res: any) {

    console.log(req,'fsdfddsfsffsdfsfsfsfdfdsfdsfsdfsd');
    console.log(res,'fsdfddsfsffsdfsfsfsfdfdsfdsfsdfsd');


  }
}
