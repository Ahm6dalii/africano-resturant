import { Module } from '@nestjs/common';
import { PaymentWebhookService } from './payment-webhook.service';
import { PaymentWebhookController } from './payment-webhook.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { Cart, CartSchema } from 'src/core/schemas/cart.schema';
import { Order, OrderSchema } from 'src/core/schemas/order.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[HttpModule,MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }
    ,{ name:Cart.name, schema: CartSchema }])],
  controllers: [PaymentWebhookController],
  providers: [PaymentWebhookService,JwtService],
})
export class PaymentWebhookModule {}