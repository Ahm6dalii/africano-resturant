import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema({timestamps:true,versionKey:false})
export class User {

    @Prop({required:true})
    name:string;

    @Prop({required:true,unique:true})
    email:string;


    @Prop({required:true})
    password:string;

    @Prop() 
    image: string;
    
    @Prop({
        type: String,
        default: () => Math.floor(100000 + Math.random() * 900000).toString(), // Generates a random 6-digit OTP code
      })
      OTBCode: string;
    
      @Prop({
        type: Date,
        default: () => new Date(Date.now() + 15 * 60 * 1000), // 15 minutes expiry time
      })
      OTBCodeExpiry: Date;

      @Prop({
        type: Boolean,
        default: false
      })
      isConfirmed: boolean;

      @Prop({
        type: String, 
      })
      address: string;
    
      @Prop({ required: false }) 
      phone: string;
    
     

}
export const UserSchema = SchemaFactory.createForClass(User);