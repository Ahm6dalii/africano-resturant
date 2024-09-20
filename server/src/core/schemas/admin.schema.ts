import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class Admin {
  @Prop({ required: true, unique: true })
  username: string;



  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isSuperAdmin: boolean; 

  @Prop({ type: [String], default: [] })
  permissions: string[]; 

  @Prop({ default: true })
  isActive: boolean; 
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

//* Middleware for hashing passwords before saving
AdminSchema.pre('save', async function (next) {
  const admin = this;
  if (!admin.isModified('password')) return next();
  admin.password = await bcrypt.hash(admin.password, 10);
  next();
});
