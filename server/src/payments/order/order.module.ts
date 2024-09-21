import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/core/schemas/order.schema';
import { JwtService } from '@nestjs/jwt';
import { NotifictionsModule } from 'src/modules/notifictions/notifictions.module';

@Module({
  imports: [NotifictionsModule, MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],


  controllers: [OrderController],
  providers: [OrderService, JwtService],
})
export class OrderModule { }
