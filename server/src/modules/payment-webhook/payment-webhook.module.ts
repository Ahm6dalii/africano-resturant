import { Module } from '@nestjs/common';
import { PaymentWebhookService } from './payment-webhook.service';
import { PaymentWebhookController } from './payment-webhook.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { Cart, CartSchema } from 'src/core/schemas/cart.schema';
import { Order, OrderSchema } from 'src/core/schemas/order.schema';
import { JwtService } from '@nestjs/jwt';
import { NotifictionsModule } from '../notifictions/notifictions.module';
import { AdminModule } from '../admin/admin.module';
import { Admin, AdminSchema } from 'src/core/schemas/admin.schema';

@Module({
  imports: [AdminModule, NotifictionsModule, HttpModule, MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }
    , { name: Cart.name, schema: CartSchema }, { name: Admin.name, schema: AdminSchema }])],
  controllers: [PaymentWebhookController],
  providers: [PaymentWebhookService, JwtService],
})
export class PaymentWebhookModule { }
