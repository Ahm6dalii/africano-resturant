import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Delivery extends Document{
  @Prop({ required: true })
  price: string
}

export const  DeliverySchema = SchemaFactory.createForClass( Delivery);
