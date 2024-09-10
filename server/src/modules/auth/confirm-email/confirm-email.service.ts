import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/schemas/user.schema';
import { ConfirmationDto } from '../dto/confirm.dto';

@Injectable()
export class ConfirmEmailService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async confirmAcount(confirmation:ConfirmationDto){
        const { email, OTBCode } = confirmation;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Check if OTBCode matches and if it has not expired
    if (user.OTBCode !== OTBCode) {
      throw new HttpException('Invalid OTP code', HttpStatus.BAD_REQUEST);
    }

    if (user.OTBCodeExpiry < new Date()) {
      throw new HttpException('OTP code has expired', HttpStatus.BAD_REQUEST);
    }
    user.isConfirmed = true; 
    user.OTBCode= undefined
    user.OTBCodeExpiry= undefined
    await user.save();

    return { message: 'Account confirmed successfully' };
    }
}
