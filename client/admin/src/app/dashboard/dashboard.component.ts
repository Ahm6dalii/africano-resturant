import { Component, OnInit } from '@angular/core';
import { SocketIoService } from './../services/socket-io.service';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  adminId: any
  constructor(private _authService: AuthService, private _socketIoService: SocketIoService, private _chatService: ChatService) { }

  ngOnInit(): void {
    this.adminId = this._authService.tokenUserId.getValue();

    this._socketIoService.setUserId(this._authService.tokenUserInfo.getValue().userId);
    this._socketIoService.startListening();
    this._socketIoService.emit('register', { adminId: this.adminId, userId: null });
    this._socketIoService.on('connect', () => {

    });

  }

}
