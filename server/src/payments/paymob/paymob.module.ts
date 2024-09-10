import { Module } from '@nestjs/common';
import { PaymobService } from './paymob.service';
import { PaymobController } from './paymob.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/core/schemas/order.schema';
PaymobService
@Module({
  imports:[HttpModule,MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  controllers: [PaymobController],
  providers: [PaymobService],
})
export class PaymobModule {}
