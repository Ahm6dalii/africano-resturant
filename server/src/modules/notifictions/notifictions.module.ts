import { Module } from '@nestjs/common';
import { NotifictionsService } from './notifictions.service';
import { NotifictionsGateway } from './notifictions.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Notifiction, NotifictionSchema } from 'src/core/schemas/notifiction.schema';
import { NotifictionsController } from './notifictions.controller';
import { Admin, AdminSchema } from 'src/core/schemas/admin.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Notifiction.name, schema: NotifictionSchema }, { name: Admin.name, schema: AdminSchema }])],
  providers: [NotifictionsGateway, NotifictionsService],
  controllers: [NotifictionsController],
  exports: [NotifictionsGateway, NotifictionsService],

})
export class NotifictionsModule { }
