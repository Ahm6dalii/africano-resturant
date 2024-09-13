import { Body, Controller, Get, Headers, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { PaymobService } from './paymob.service';


@Controller('paymob')
export class PaymobController {
  constructor(private readonly paymobService: PaymobService) {}

  @Post()
  async createIntention(@Body() body:any,@Param() param:any,@Headers() header:any ) {
    const {token} =header
    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.FORBIDDEN);
  }
  
    try {
    const result = await this.paymobService.createPaymentIntention(body,param,token);
    let apiLink=`https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_test_gGwWuPT1KOXYPftr2rBzO2ilQfY0Kp17&clientSecret=${result.client_secret}`
    let {client_secret,...paymentDetail}=result
      return {...paymentDetail,apiLink};
    } catch (error) {
      return { error: 'Failed to create payment intention' };
    }
  }
 

}
