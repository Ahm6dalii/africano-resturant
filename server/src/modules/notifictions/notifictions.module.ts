import { Module } from '@nestjs/common';
import { NotifictionsService } from './notifictions.service';
import { NotifictionsGateway } from './notifictions.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Notifiction, NotifictionSchema } from 'src/core/schemas/notifiction.schema';
import { NotifictionsController } from './notifictions.controller';
import { Admin, AdminSchema } from 'src/core/schemas/admin.schema';
import { Chat, ChatSchema } from 'src/core/schemas/chat.schema';
import { User, UserSchema } from 'src/core/schemas/user.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Notifiction.name, schema: NotifictionSchema }, { name: Admin.name, schema: AdminSchema }, { name: User.name, schema: UserSchema }, { name: Chat.name, schema: ChatSchema }])],
  providers: [NotifictionsGateway, NotifictionsService],
  controllers: [NotifictionsController],
  exports: [NotifictionsGateway, NotifictionsService],

})
export class NotifictionsModule { }
