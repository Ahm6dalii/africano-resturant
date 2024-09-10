import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/schemas/user.schema';
import { signUpDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/core/utils/sendMail';

@Injectable()
export class SignupService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly _MailService: MailService  // Inject AppService properly here
    ) {}

    async signUp(body: signUpDto) {
        let user = await this.userModel.findOne({ email: body.email })
        if (user) throw new HttpException('already registerde', HttpStatus.CONFLICT);
        // console.log(body);
        body.password = await bcrypt.hash(body.password, 10);
        const addedUser= await this.userModel.create(body)
        this._MailService.sendMail(addedUser.email,addedUser.OTBCode)
        return {message:"success",addedUser}
    }
}
