import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/core/gaurds/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }
  @Get()
  getAllOrder(@Query('search') search: string,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1) {
    return this.orderService.allOrder(search, page, limit)
  }


  @Get('userOrders')
  getUserOrder(@Headers() header,@Query('search') search: string,
  @Query('limit') limit: number = 10,
  @Query('page') page: number = 1) {
    const { token } = header
    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.FORBIDDEN);
    }
    return this.orderService.userOrders(token,search, limit, page)
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

  @Delete('deleteOrder/:id')
  @UseGuards(JwtAuthGuard)
  deleteOrders(@Param('id') id: string, @Req() req) {
    console.log(req.user, "let sseee ")
    const adminId = req.user.userId;
    return this.orderService.deleteOrder(id, adminId)
  }



  @Get('earnings/weekly')
  async getWeeklyEarnings() {
    return { totalEarnings: await this.orderService.getWeeklyEarnings() };
  }

  @Get('earnings/monthly')
  async getMonthlyEarnings() {
    return { totalEarnings: await this.orderService.getMonthlyEarnings() };
  }

  @Get('earnings/yearly')
  async getYearlyEarnings() {
    return { totalEarnings: await this.orderService.getYearlyEarnings() };
  }


  @Get('soldItem/weekly')
  async getTopSoldItemsWeekly() {
    return { totalEarnings: await this.orderService.getTopSoldItemsWeekly() };
  }
  @Get('soldItem/monthly')
  async getTopSoldItemsMonthly() {
    return { totalEarnings: await this.orderService.getTopSoldItemsMonthly() };
  }
  @Get('soldItem/yearly')
  async getTopSoldItemsYearly() {
    return { totalEarnings: await this.orderService.getTopSoldItemsYearly() };
  }
  @Get('payment-method-counts/weekly')
  async getWeeklyPaymentMethodCounts() {
    return await this.orderService.getWeeklyPaymentMethodCounts();
  }

  @Get('payment-method-counts/monthly')
  async getMonthlyPaymentMethodCounts() {
    return await this.orderService.getMonthlyPaymentMethodCounts();
  }

  @Get('payment-method-counts/yearly')
  async getYearlyPaymentMethodCounts() {
    return await this.orderService.getYearlyPaymentMethodCounts();
  }
}

