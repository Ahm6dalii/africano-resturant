// notifications.controller.ts
import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
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

    @Get('chat/:userId')
    async getUsersChat(@Param('userId') userId: string) {
        return this.notificationsService.getUsersChat(userId)
    }
    @Get('chat/update/:messageId')
    async updateMessage(@Param('messageId') userId: string) {
        return this.notificationsService.updateMessage(userId)
    }


    @Get()
    async getAllChats(@Query('status') status: string) {
        console.log('Received status query:', status);

        if (status === 'unread') {
            return this.notificationsService.getUnreadChats();
        } else {
            return this.notificationsService.getAllChats();
        }
    }
}
