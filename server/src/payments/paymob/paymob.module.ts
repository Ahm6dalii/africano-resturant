import { Module } from '@nestjs/common';
import { PaymobService } from './paymob.service';
import { PaymobController } from './paymob.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/core/schemas/order.schema';
import { JwtService } from '@nestjs/jwt';
import { Cart, CartSchema } from 'src/core/schemas/cart.schema';
import { Delivery, DeliverySchema } from 'src/core/schemas/delivery.schema';
import { NotifictionsModule } from 'src/modules/notifictions/notifictions.module';

PaymobService
@Module({
  imports: [NotifictionsModule, HttpModule, MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }
    , { name: Cart.name, schema: CartSchema }, { name: Delivery.name, schema: DeliverySchema }])],
  controllers: [PaymobController],
  providers: [PaymobService, JwtService],
})
export class PaymobModule { }
