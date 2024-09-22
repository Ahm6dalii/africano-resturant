import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayDisconnect, OnGatewayConnection } from '@nestjs/websockets';
import { NotifictionsService } from './notifictions.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class NotifictionsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private server: Server
  private clients = new Map<string, Socket>();
  constructor(private readonly notifictionsService: NotifictionsService) { }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
    // Remove the client from the map when they disconnect
    for (const [userId, socket] of this.clients.entries()) {
      if (socket.id === client.id) {
        this.clients.delete(userId);
        break;
      }
    }
  }


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

    console.log(client + updatedOrder, "client test");

    client.emit('updatedOrder', updatedOrder);

  }
  // @SubscribeMessage('getNewReview')
  // handleGetNewReview(@ConnectedSocket() client: Socket) {
  //   console.log('Client connected for new reviews');
  // }
  afterInit(server: Server) {
    this.server = server;
  }
}
