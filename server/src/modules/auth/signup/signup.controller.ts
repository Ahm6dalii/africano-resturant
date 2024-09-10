import { Body, Controller, Post } from '@nestjs/common';
import { SignupService } from './signup.service';
import { signUpDto } from '../dto/auth.dto';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}
  @Post()
  signUp(@Body() body:signUpDto){
    return this.signupService.signUp(body)
}
}
