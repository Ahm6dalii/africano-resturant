import { Injectable, Body, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/schemas/user.schema';

@Injectable()
export class UpdateInfoService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,private _jwtservice:JwtService ){}
   async updateInfo(body,token){
        const decoded=this._jwtservice.verify(token,{secret:"mo2"});
            if (!decoded) {
                 throw new HttpException('invalid token', HttpStatus.FORBIDDEN);
            }
            const {userId}=decoded
            
            const updatedUser = await this.userModel.findByIdAndUpdate(userId,body,{new:true})
            if(!updatedUser){
                throw new HttpException('not found', HttpStatus.NOT_FOUND);

            }
            return {message:"updated successfully",updatedUser}

    }

}
