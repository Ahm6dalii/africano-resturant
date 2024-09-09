import { Body, Controller, Post } from '@nestjs/common';
import { ConfirmEmailService } from './confirm-email.service';
import { ConfirmationDto } from '../dto/confirm.dto';

@Controller('confirm')
export class ConfirmEmailController {
    constructor(private _confirmEmailService :ConfirmEmailService) {}

    @Post()
    confirmAcount(@Body() body:ConfirmationDto){
        return this._confirmEmailService.confirmAcount(body)
    }
}
