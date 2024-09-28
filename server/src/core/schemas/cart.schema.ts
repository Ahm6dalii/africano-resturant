import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true, versionKey: false })
export class Cart extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop([{
    items: { type: Types.ObjectId, ref: 'Food', required: true },
    size: { type: String, required: true },
    amount: Number,
    description: Object,
    name: Object,
    image: String,
    quantity: { type: Number, required: true, min: 1 }
  }])

  items: Array<{
    items: Types.ObjectId;
    size: string;
    amount: any;
    description: object,
    name: object,
    image: string,
    quantity: number;

  }>;

  @Prop({ default: 0 })
  totalPrice: number; // Calculate this dynamically or store it dirct
}

export const CartSchema = SchemaFactory.createForClass(Cart);
