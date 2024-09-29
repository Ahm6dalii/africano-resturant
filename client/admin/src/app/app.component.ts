import { Component } from '@angular/core';
import { SocketIoService } from './services/socket-io.service';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flexy-angular';
  adminId: any
  private subscriptions: Subscription[] = [];

  constructor(private _socketIoService: SocketIoService, private _authService: AuthService, private _chatService: ChatService) { }

  ngOnInit() {
    this.adminId = this._authService.tokenUserId.getValue();


    this._socketIoService.emit('register', { adminId: this.adminId, userId: null });

    // Start listening to the socket connection
    this._socketIoService.startListening();

    this._socketIoService.startListening();
    this._socketIoService.on('connect', () => {

    });

    this._socketIoService.newMessage$.subscribe((message) => {
      if (message) {

        if (message.senderModel !== "Admin") {
          this._chatService.changeRead(true)
        }
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe from subscriptions to avoid memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());

    // Stop listening to the socket connection
    this._socketIoService.stopListening();
  }
}
