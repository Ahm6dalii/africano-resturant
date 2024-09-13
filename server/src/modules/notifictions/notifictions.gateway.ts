import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { NotifictionsService } from './notifictions.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class NotifictionsGateway {
  private server: Server
  constructor(private readonly notifictionsService: NotifictionsService) { }

  @SubscribeMessage('getNotifiction')
  async handleGetNotifications(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    const notifications = await this.notifictionsService.getNotifications(userId);
    client.emit('notifications', notifications);
  }

  async sendNotificationToAll(notification: any) {
    this.server.emit('notifications', notification);
  }
  afterInit(server: Server) {
    this.server = server;
  }
}
