import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Category } from './categories.schema';
import { User } from './user.schema';

@Schema()
export class Food extends Document {
  @Prop({ type: Object, required: true })
  name: object;

  @Prop({
    required: true,
    type: Object,
    default: {},
  })
  description: object;

  @Prop({
    required: true,
    type: Object,
    default: {},
  })
  amount: {
    S?: number;
    M?: number;
    L?: number;
    R?: number;
  };

  @Prop({ required: false, default: 1 })
  quantity: number;

  @Prop({
    required: true,
    type: mongoose.Types.ObjectId,
    ref: 'Category',
  })
  category: Category;

  @Prop()
  image: string;
  @Prop({
    type: [
      {
        text: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  })
  review: { text: string; user: User; createdAt: Date }[];
}

export const FoodSchema = SchemaFactory.createForClass(Food);


