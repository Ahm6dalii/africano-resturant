import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { signInDto } from '../dto/auth.dto';
import { User } from 'src/core/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UpdatePaswordService {
    
        constructor(
            @InjectModel(User.name) private readonly userModel: Model<User>,private _jwtService: JwtService
        ) {}
       
    
        // Update user password
        async updatePassword(token:string,newPassword:string){
            const decoded=this._jwtService.verify(token,{secret:"mo2"});
            if (!decoded) {
                 throw new HttpException('invalid token', HttpStatus.FORBIDDEN);
            }
            const {email}=decoded
            const user =await this.userModel.findOne({email})
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
                const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();
            return { message: 'Password updated successfully',email };
        }
    }

