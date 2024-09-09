import { Body, Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  } 
  @Get()
  getAllOrder(){
    return this.orderService.allOrder()
  }
  @Get('userOrders')
  getUserOrder(@Body() body:any){
    return this.orderService.userOrders(body)
  }

}
