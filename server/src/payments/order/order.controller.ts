import { Body, Controller, Get, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService ) {
  } 
  @Get()
  getAllOrder(){
    return this.orderService.allOrder()
  }
  
  @Get('userOrders')
  getUserOrder(@Body() body:any,@Headers() header){
    const {token} =header
    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.FORBIDDEN);
  }
    return this.orderService.userOrders(token)
  }

}
