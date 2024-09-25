import { Body, Controller, Get, Headers, HttpException, HttpStatus, Param, Patch, Query } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }
  @Get()
  getAllOrder(@Query('search') search: string,
  @Query('limit') limit: number = 10,
  @Query('page') page: number = 1) {
    return this.orderService.allOrder(search,page,limit)
  }


  @Get('userOrders')
  getUserOrder(@Headers() header) {
    const { token } = header
    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.FORBIDDEN);
    }
    return this.orderService.userOrders(token)
  }

  @Get('ordersByStatus')
  getOrdersByStatus(@Query('status') status?: string) {
    return this.orderService.getOrdersByStatus(status)
  }
  @Patch('updateordersByStatus/:id')
  updateOrderStatus(@Param('id') id: string, @Body() body: any) {
    console.log(body, "body")
    return this.orderService.updateOrderStatus(id, body)
    // req.io.emit('newReview', addedReview.review[addedReview.review.length - 1]);
  }

}

