import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Category } from './categories.schema';
import { User } from './user.schema';

@Schema()
export class Food extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.Mixed,
  })
  price: {
    S?: number;
    M?: number;
    L?: number;
  };
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: Category;

  @Prop()
  image: string;
  @Prop({ type: [{ text: String, user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }] })
  review: { text: string; user: User }[];

}

export const FoodSchema = SchemaFactory.createForClass(Food);
