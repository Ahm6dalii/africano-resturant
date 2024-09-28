import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private socket: Socket;
  private newMessageSubject = new BehaviorSubject<any>(null);
  public newMessage$: Observable<any> = this.newMessageSubject.asObservable();
  private isListening: boolean = false;
  constructor() {
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
      withCredentials: true,
    });

  }


  startListening() {
    if (!this.isListening) {
      console.log('Starting to listen for messages');
      this.setupSocketListeners();
      this.isListening = true;
    }
  }

  stopListening() {
    if (this.isListening) {
      console.log('Stopping listening for messages');
      this.socket.off('newMessage');
      this.isListening = false;
    }
  }
  private setupSocketListeners() {
    console.log('Setting up socket listeners');
    this.socket.on('newMessage', (message) => {
      console.log('New message received:', message);
      this.newMessageSubject.next(message);
    });
  }
  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  on(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }

  disconnect() {
    this.socket.disconnect();
  }

}
