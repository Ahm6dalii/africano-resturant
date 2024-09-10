import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from 'src/core/schemas/cart.schema';
import { User, UserSchema } from 'src/core/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Product, ProductSchema } from 'src/core/schemas/product.schema';

@Module({
  imports:[ MongooseModule.forFeature([
    { name: Cart.name, schema: CartSchema },
    { name: Product.name, schema: ProductSchema },
    { name: User.name, schema: UserSchema }
  ])],
  controllers: [CartController],
  providers: [CartService,JwtService],
})
export class CartModule {}
