import { Controller, Post, Body } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post('request')
  async requestPasswordReset(@Body('email') email: string) {
    return this.resetPasswordService.requestPasswordReset(email);
  }

  @Post('reset')
  async resetPassword(
    @Body('email') email: string,
    @Body('otp') otp: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.resetPasswordService.resetPassword(email, otp, newPassword);
  }
}
