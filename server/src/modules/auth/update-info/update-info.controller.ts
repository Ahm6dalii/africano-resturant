import { BadRequestException, Body, Controller, Headers, HttpException, HttpStatus, Patch, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UpdateInfoService } from './update-info.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/core/utils/cloudinary/cloudinary.service';

@Controller('update-info')
export class UpdateInfoController {
    constructor(private readonly _updateInfoService: UpdateInfoService, private readonly cloudinaryService: CloudinaryService) { }

    @Patch()
    @UseInterceptors(FileInterceptor('file'))
    async updateInfo(@Body() body: any, @Headers() header, @UploadedFile() file: Express.Multer.File) {

        console.log(file, 'sdsdssds');

        const { token } = header

        if (!token) {
            throw new HttpException('Token not provided', HttpStatus.FORBIDDEN);
        }

        console.log(body);

        return this._updateInfoService.updateInfo(body, token, file)
    }
}
