import { Body, Controller, Get, Headers, HttpException, HttpStatus, Post } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}


  
  @Post()
  updateDelivery(@Body() body:any,@Headers() header){
    const { token } = header

    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.FORBIDDEN);
    }

    return this.deliveryService.updateDeliveyPrice(body)  
  }
  @Get()
  getDelivery(){
  

    return this.deliveryService.getDeliveyPrice()
  }
}
