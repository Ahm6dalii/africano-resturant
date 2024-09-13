import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";
import mongoose from "mongoose";


@Schema({ timestamps: true, versionKey: false })
export class Notifiction {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop({ type: String, required: true })
    type: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    relatedId: any

    @Prop({ type: String, required: true })
    message: string

    @Prop({ type: Boolean, default: false })
    read: boolean

    @Prop({ type: Date, default: Date.now })
    createdAt: Date

}

export const NotifictionSchema = SchemaFactory.createForClass(Notifiction);