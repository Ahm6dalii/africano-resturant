import { Body, Controller, Post } from '@nestjs/common';
import { ResendOtbService } from './resend-otb.service';

@Controller('resend-otb')
export class ResendOtbController {

constructor(private readonly resendOtpService: ResendOtbService) {}
    @Post()
    async resendOtp(@Body('email') email: string) {
      return this.resendOtpService.resendOtp(email);
    }

}
