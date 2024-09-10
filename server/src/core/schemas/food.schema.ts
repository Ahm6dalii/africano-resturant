import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Category } from './categories.schema';

@Schema()
export class Food extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: Category;

  @Prop()
  image: string;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
