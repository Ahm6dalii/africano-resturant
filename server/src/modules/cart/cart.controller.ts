import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':id')
  addToCart(
    @Param('id') param: string, 
    @Body() body: { size: string,quantity:number }, 
    @Headers() header: { token: string }
  ) {
    const { token } = header;
    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.FORBIDDEN);
    }
    const { size,quantity} = body;
    console.log("get size mow mo2  ",size);

    if (!size) {
      throw new HttpException('Size not provided', HttpStatus.BAD_REQUEST);
    }
    return this.cartService.addToCartt(param, size, quantity, token);
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
     //  delete item
  @Delete(':id')
  deleteProduct(@Param('id') param:any,@Headers() header,@Body() body:any){
    const {token} =header
    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.FORBIDDEN);
  }
  const { size } = body;
  console.log("get size mow mo2  ",size);

  if (!size) {
    throw new HttpException('Size not provided', HttpStatus.BAD_REQUEST);
  }
    return this.cartService.deleteProduct(param,size,token)
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
