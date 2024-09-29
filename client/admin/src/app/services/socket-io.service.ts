import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {
  private socket: Socket;
  private reconnectInterval = 5000; // 5 seconds
  private maxReconnectAttempts = 5;
  private reconnectAttempts = 0;
  userId: any = '';
  private newMessageSubject = new BehaviorSubject<any>(null);
  newMessage$ = this.newMessageSubject.asObservable();

  constructor() {

    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
      withCredentials: true,
    });
    this.setupSocketListeners()
  }
  private setupSocketListeners() {
    this.socket.on('connect', () => {

      this.reconnectAttempts = 0;

      if (this.userId) {
        this.emit('register', this.userId);
      }
    });

    this.socket.on('disconnect', (reason) => {

      if (reason === 'io server disconnect') {
        this.tryReconnect();
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.tryReconnect();
    });

    this.socket.on('newMessage', (message: any) => {
      this.newMessageSubject.next(message);
    });
    this.socket.on('reconnect_attempt', () => {

    });

    this.socket.on('reconnect_failed', () => {
      console.error('Reconnection failed');
    });
  }


  private tryReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {

        this.socket.connect();
        this.reconnectAttempts++;
      }, this.reconnectInterval);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  startListening() {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  stopListening() {
    this.socket.disconnect();
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  on(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }
  // Method to set the user ID
  setUserId(userId: string) {
    this.userId = userId;
    if (this.socket.connected) {
      this.emit('register', userId); // Emit immediately if already connected
    }
  }
}
