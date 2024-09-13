import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true,versionKey:false })
export class Cart extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId; 

  @Prop([{
    items: { type: Types.ObjectId, ref: 'Food', required: true },
    amount:Number,
    description:String,
    name:String,
    image:String,
    quantity: { type: Number, required: true, min: 1 }
  }])

  items: Array<{
    items: Types.ObjectId;
    amount:number,
    description:string,
    name:string,
    image:string,
    quantity: number;
  }>;

  @Prop({ default: 0 })
  totalPrice: number; // Calculate this dynamically or store it directly
}

export const CartSchema = SchemaFactory.createForClass(Cart);
