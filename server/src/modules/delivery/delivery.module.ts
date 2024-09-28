import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { Delivery, DeliverySchema } from 'src/core/schemas/delivery.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifictionsModule } from '../notifictions/notifictions.module';
import { User, UserSchema } from 'src/core/schemas/user.schema';

@Module({
  imports: [NotifictionsModule, MongooseModule.forFeature([
    { name: Delivery.name, schema: DeliverySchema }, { name: User.name, schema: UserSchema },
  ])],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule { }
