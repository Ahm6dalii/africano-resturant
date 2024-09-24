// notifications.controller.ts
import { Controller, Get, Param, Patch } from '@nestjs/common';
import { NotifictionsService } from './notifictions.service';

@Controller('notifications')
export class NotifictionsController {
    constructor(private readonly notificationsService: NotifictionsService) { }

    @Get(':userId')
    async getUserNotifications(@Param('userId') userId: string) {
        return this.notificationsService.getNotifications(userId);
    }
    @Patch('update/:userId')
    async markAsRead(@Param('userId') userId: string) {
        return this.notificationsService.markAsRead(userId);
    }
}
