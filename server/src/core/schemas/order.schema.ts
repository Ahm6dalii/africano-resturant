import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
 
  @Prop({ type: mongoose.Schema.Types.ObjectId , ref: 'user' ,required:true})
  userId:Types.ObjectId;

  @Prop({type:Object})
  intention_detail: any;

  @Prop({type:Object})
  billing_data: any;


}

export const OrderSchema = SchemaFactory.createForClass(Order);
