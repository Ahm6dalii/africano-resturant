import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':id')
  addToCart(@Param('id') param:any,@Body() body:any,@Headers() header){
    const {token} =header
    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.FORBIDDEN);
  }
    return  this.cartService.addToCartt(param,token)
  }

  @Get()
  getAllProduct(){
return this.cartService.getAllProduct();
  }

  @Post('update-quantity/:id')
  async updateQuantity(@Param('id') param:any,@Body() body:any,@Headers() header:any) {
    const {token} =header
    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.FORBIDDEN);
  }
    const cart = await this.cartService.updateQuantity(body,param,token);
    return cart;
  }

  @Delete(':id')
  deleteProduct(@Param('id') param:any,@Headers() header){
    const {token} =header
    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.FORBIDDEN);
  }
    return this.cartService.deleteProduct(param,token)
  }
  @Delete()
  deleteAllCart(@Param('id') param:any,@Headers() header){
    const {token} =header
    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.FORBIDDEN);
  }
    return this.cartService.removeAllCartItems(token)
  }
}
