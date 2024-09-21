import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { NotifictionsService } from './notifictions.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class NotifictionsGateway {
  private server: Server
  private clients: Map<string, Socket> = new Map();
  constructor(private readonly notifictionsService: NotifictionsService) { }

  @SubscribeMessage('register')
  handleRegister(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    this.clients.set(userId, client);
    console.log(`User ${userId} connected`);
  }

  @SubscribeMessage('getNotifiction')
  async handleGetNotifications(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    const notifications = await this.notifictionsService.getNotifications(userId);
    client.emit('notifications', notifications);
  }

  async sendNotificationToAll(notification: any) {
    this.server.emit('notifications', notification);
  }
  async sendNewReviewToAll(review: any) {
    this.server.emit('newReview', review);
  }
  async sendNewOrderToAll(myOrder: any) {
    this.server.emit('newOrder', myOrder);
  }
  async sendUpdatedOrderToUser(userId: any, updatedOrder: any) {
    const client = this.clients.get(userId);
    if (client) {
      client.emit('updatedOrder', updatedOrder);
    }
  }
  // @SubscribeMessage('getNewReview')
  // handleGetNewReview(@ConnectedSocket() client: Socket) {
  //   console.log('Client connected for new reviews');
  // }
  afterInit(server: Server) {
    this.server = server;
  }
}
