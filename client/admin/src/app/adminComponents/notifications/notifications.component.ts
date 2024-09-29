import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SocketIoService } from 'src/app/services/socket-io.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit, OnDestroy {
  dropdownOpen = false;
  notifications: any[] = [];
  adminId: any
  constructor(private _notificationService: NotificationsService, private _socketIoService: SocketIoService, private _chatService: ChatService, private _authService: AuthService) {
    this.getAllNotifications();
  }

  ngOnInit() {
    this.getAllNotifications();
    this.adminId = this._authService.tokenUserId.getValue();


    this._socketIoService.emit('register', { adminId: this.adminId, userId: null });

    this._socketIoService.on('notifications', (notification) => {

      this.notifications.push(notification)
    })
    this._socketIoService.on('userNotification', (notifications) => {


      this.notifications.push(notifications)

    })
    this._socketIoService.on('adminNotification', (notifications) => {


      this.notifications.push(notifications)

    })
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

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  getAllNotifications() {
    this._notificationService.fetchNotifications().subscribe({
      next: (res: any) => {

        this.notifications = res.filter((noti: any) => noti.read === false && noti.type !== 'Delivery_Changed' && noti.type !== 'order_status_updated')
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  markAllAsRead() {
    this._notificationService.markAllAsRead().subscribe({
      next: (res: any) => {

        this.notifications = [];
      },
      error: (err) => {
        console.error(err);
      }
    })
  }



  ngOnDestroy() {

    this._socketIoService.stopListening();
  }


}

