import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from 'src/core/schemas/cart.schema';
import { User, UserSchema } from 'src/core/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Product, ProductSchema } from 'src/core/schemas/product.schema';
import { Food, FoodSchema } from 'src/core/schemas/food.schema';
import { Delivery, DeliverySchema } from 'src/core/schemas/delivery.schema';

@Module({
  imports:[ MongooseModule.forFeature([
    { name: Cart.name, schema: CartSchema },
    { name: Product.name, schema: ProductSchema },
    { name: Food.name, schema:FoodSchema },
    { name: User.name, schema: UserSchema },
    { name: Delivery.name, schema: DeliverySchema }
  ])],
  controllers: [CartController],
  providers: [CartService,JwtService],
})
       
export class CartModule {}
