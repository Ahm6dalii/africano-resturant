import { Body, Controller, Header, Headers, HttpException, HttpStatus, Put, Req } from '@nestjs/common';
import { UpdatePaswordService } from './update-pasword.service';

@Controller('update-pasword')
export class UpdatePaswordController {
    constructor(private _updatePaswordService: UpdatePaswordService) { }
    @Put()
    async resetPassword(
        @Headers() header, @Body('newPassword') newPassword: string) {
        const { token } = header

        if (!token) {
            throw new HttpException('Token not provided', HttpStatus.FORBIDDEN);
        }

        return this._updatePaswordService.updatePassword(token, newPassword);
    }
}
