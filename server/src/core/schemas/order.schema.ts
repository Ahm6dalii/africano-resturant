import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Types } from 'mongoose';

export type OrderDocument = Order & Document;
export enum OrderStatus {
  PREPARING = 'preparing',
  ON_THE_WAY = 'on_the_way',
  DELIVERED = 'delivered',
}
@Schema({ timestamps: true })
export class Order {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Object })
  intention_detail: any;

  @Prop({ type: Object })
  billing_data: any;

  @Prop({
    type: String,
    enum: OrderStatus,
    default: OrderStatus.PREPARING
  })
  status: OrderStatus;


  @Prop({ type: String, enum: ['online', 'cash'], default: 'online' })
  payment_method: string;

}

export const OrderSchema = SchemaFactory.createForClass(Order);
