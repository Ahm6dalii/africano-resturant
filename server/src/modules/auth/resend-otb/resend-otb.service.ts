import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/schemas/user.schema';
import { MailService } from 'src/core/utils/sendMail';

@Injectable()
export class ResendOtbService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,private readonly _MailService: MailService){}

    async resendOtp(email:string){
        const user = await this.userModel.findOne({ email });
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        const newOtpExpiry = new Date(Date.now() + 15 * 60 * 1000);
        user.OTBCode = newOtp;
        user.OTBCodeExpiry = newOtpExpiry;
        await user.save();
        console.log(user);
        this._MailService.sendMail(user.email,user.OTBCode)
        return { message: 'OTP sent to email' };
        
    }
}
