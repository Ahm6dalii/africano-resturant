import { Body, Controller, Headers, HttpException, HttpStatus, Param, Patch, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ChangeImgProfileService } from './change-img-profile.service';
import { CloudinaryService } from 'src/core/utils/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('change-profile-img')
export class ChangeImgProfileController {
  constructor(private readonly _changeImgProfileService: ChangeImgProfileService, private readonly cloudinaryService: CloudinaryService) { }

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  async updateInfo(@Headers() header, @UploadedFile() file: Express.Multer.File) {
    const { token } = header

    if (!token) {
      throw new HttpException('Token not provided', HttpStatus.FORBIDDEN);
    }


    return this._changeImgProfileService.changeProfileImg(token, file)
  }
}