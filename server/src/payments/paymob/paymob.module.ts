import { Module } from '@nestjs/common';
import { PaymobService } from './paymob.service';
import { PaymobController } from './paymob.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Order, OrderSchema } from 'src/core/schema/order.schema';
import { MongooseModule } from '@nestjs/mongoose';
PaymobService
@Module({
  imports:[HttpModule,MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  controllers: [PaymobController],
  providers: [PaymobService],
})
export class PaymobModule {}
