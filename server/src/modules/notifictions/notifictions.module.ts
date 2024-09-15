import { Module } from '@nestjs/common';
import { NotifictionsService } from './notifictions.service';
import { NotifictionsGateway } from './notifictions.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Notifiction, NotifictionSchema } from 'src/core/schemas/notifiction.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Notifiction.name, schema: NotifictionSchema }])],
  providers: [NotifictionsGateway, NotifictionsService],
  exports: [NotifictionsGateway, NotifictionsService],

})
export class NotifictionsModule { }
