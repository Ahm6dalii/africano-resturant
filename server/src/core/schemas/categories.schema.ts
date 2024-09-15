import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({versionKey:false,timestamps:false})
export class Category extends Document{
  @Prop({ required: true ,type:Object})
  name: object

  
  @Prop({type:Object})
  description:object
  
  @Prop()
  image:string
}

export const CategorySchema = SchemaFactory.createForClass(Category);
