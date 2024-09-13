import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({versionKey:false,timestamps:false})
export class Category extends Document{
  @Prop({ required: true  })
  name: string
  
  @Prop()
  description:string

  @Prop()
  image:string
}

export const CategorySchema = SchemaFactory.createForClass(Category);
