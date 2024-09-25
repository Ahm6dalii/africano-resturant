import { SignupService } from './auth/signup/signup.service';
import { SigninService } from './auth/signin/signin.service';
import { SignupController } from './auth/signup/signup.controller';
import { SigninController } from './auth/signin/signin.controller';
import { Module } from '@nestjs/common';
import { User, UserSchema } from 'src/core/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from 'src/core/utils/sendMail';
import { ConfirmEmailController } from './auth/confirm-email/confirm-email.controller';
import { ConfirmEmailService } from './auth/confirm-email/confirm-email.service';
import { ResendOtbController } from './auth/resend-otb/resend-otb.controller';
import { ResendOtbService } from './auth/resend-otb/resend-otb.service';
import { ResetPasswordController } from './auth/reset-password/reset-password.controller';
import { ResetPasswordService } from './auth/reset-password/reset-password.service';
import { UpdatePaswordService } from './auth/update-pasword/update-pasword.service';
import { UpdatePaswordController } from './auth/update-pasword/update-pasword.controller';
import { UpdateInfoService } from './auth/update-info/update-info.service';
import { UpdateInfoController } from './auth/update-info/update-info.controller';
import { CartModule } from './cart/cart.module';
import { PaymentWebhookModule } from './payment-webhook/payment-webhook.module';
import { CloudinaryService } from 'src/core/utils/cloudinary/cloudinary.service';
import { ChangeImgProfileController } from './auth/change-img-profile/change-img-profile.controller';
import { ChangeImgProfileService } from './auth/change-img-profile/change-img-profile.service';
import { AdminModule } from './admin/admin.module';
import { LogModule } from './log/log.module';
import { Log, LogSchema } from 'src/core/schemas/log.schema';
import { UserDashboardController } from './auth/user-dashboard/user-dashboard.controller';
import { UserDashboardService } from './auth/user-dashboard/user-dashboard.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: Log.name, schema: LogSchema }]),
    MailerModule.forRoot({
        transport: {
          host: 'smtp.gmail.com',
          port: 587, 
          secure: false, // true for port 465, false for other ports
          auth: {
            user: 'africanooresturant@gmail.com',  // your Gmail email address
            pass: 'ucsx hvrc zyvc yycy',   // your Gmail app password
          },
        },
        defaults: {
          from: '"Note App" <noteapp08@gmail.com>', // default sender address
        },
      }),
    CartModule,
    PaymentWebhookModule,
    AdminModule,
    LogModule,],
    controllers: [UserDashboardController ,ChangeImgProfileController,SigninController,SignupController, ConfirmEmailController, ResendOtbController, ResetPasswordController, UpdatePaswordController, UpdateInfoController],
    providers: [UserDashboardService,ChangeImgProfileService,SigninService,SignupService,JwtService,MailService, ConfirmEmailService, ResendOtbService, ResetPasswordService, UpdatePaswordService, UpdateInfoService,CloudinaryService],
})
export class AuthModule {}
