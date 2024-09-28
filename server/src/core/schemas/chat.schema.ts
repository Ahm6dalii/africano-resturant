import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";

@Schema({ timestamps: true, versionKey: false })
export class Chat extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    @Prop([{
        text: { type: String, required: true },
        sender: { type: mongoose.Schema.Types.ObjectId, refPath: 'messages.senderModel' },
        senderModel: { type: String, enum: ['User', 'Admin'], required: true },
        receiver: { type: mongoose.Schema.Types.ObjectId, refPath: 'messages.receiverModel' },
        receiverModel: { type: String, enum: ['User', 'Admin'], required: true },
        createdAt: { type: Date, default: Date.now },
        read: { type: Boolean, default: false }
    }])
    messages: {
        text: string;
        sender: Types.ObjectId;
        senderModel: string;
        receiver: Types.ObjectId;
        receiverModel: string;
        read: boolean;
        createdAt: Date;
    }[];

}

export const ChatSchema = SchemaFactory.createForClass(Chat);