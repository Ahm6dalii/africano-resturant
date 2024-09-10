import { Body, Controller, Headers, HttpException, HttpStatus, Patch, Put } from '@nestjs/common';
import { UpdateInfoService } from './update-info.service';

@Controller('update-info')
export class UpdateInfoController {
    constructor(private readonly _updateInfoService: UpdateInfoService) {}
@Patch()
updateInfo(@Body() body:any ,@Headers() header){
    const {token} =header
    console.log(token);
    if (!token) {
        throw new HttpException('Token not provided', HttpStatus.FORBIDDEN);
    }
return this._updateInfoService.updateInfo(body,token)
}
}
