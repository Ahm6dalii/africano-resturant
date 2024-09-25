import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { Delivery, DeliverySchema } from 'src/core/schemas/delivery.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[  MongooseModule.forFeature([
    { name: Delivery.name, schema: DeliverySchema }
  ])],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
