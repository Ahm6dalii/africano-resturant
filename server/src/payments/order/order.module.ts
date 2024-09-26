import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/core/schemas/order.schema';
import { JwtService } from '@nestjs/jwt';
import { NotifictionsModule } from 'src/modules/notifictions/notifictions.module';
import { LogService } from 'src/modules/log/log.service';
import { Log, LogSchema } from 'src/core/schemas/log.schema';

@Module({
  imports: [NotifictionsModule, MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }, { name: Log.name, schema: LogSchema },])],


  controllers: [OrderController],
  providers: [OrderService, JwtService, LogService],
})
export class OrderModule { }
