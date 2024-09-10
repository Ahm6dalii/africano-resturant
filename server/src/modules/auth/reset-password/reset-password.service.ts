import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/core/utils/sendMail';

@Injectable()
export class ResetPasswordService {
  constructor(@InjectModel(User.name) private userModel: Model<User>,private _mailService:MailService) {}

  async resetPassword(email: string, otp: string, newPassword: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Validate OTP
    if (user.OTBCode !== otp || user.OTBCodeExpiry < new Date()) {
      throw new HttpException('Invalid or expired OTP', HttpStatus.BAD_REQUEST);
    }

    // *Hash the new password
    user.password = await bcrypt.hash(newPassword, 10);
    user.OTBCode = undefined;  // * Clear OTP
    user.OTBCodeExpiry = undefined;  // *Clear expiry

    await user.save();

    return { message: 'Password reset successfully' };
  }
  async requestPasswordReset(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Generate a new OTP and set expiry
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const newOtpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes expiry

    user.OTBCode = newOtp;
    user.OTBCodeExpiry = newOtpExpiry;
    await user.save();

    // Send OTP to user's email
    await this._mailService.sendMail(user.email, newOtp);

    return { message: 'OTP sent to email' };
  }
}
