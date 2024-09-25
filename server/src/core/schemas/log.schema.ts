import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Admin } from './admin.schema';


@Schema({timestamps:true,versionKey:false})
export class Log extends Document {

  @Prop({ required: true })
  action: string;
  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'Admin',
  })
  admin: Admin;
}

export const LogSchema = SchemaFactory.createForClass(Log);
