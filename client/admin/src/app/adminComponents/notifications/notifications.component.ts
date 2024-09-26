import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
  constructor(private _notificationService: NotificationsService, private _socketIoService: SocketIoService) { }

  ngOnInit() {
    this.getAllNotifications();
    this._socketIoService.on('notifications', (notification) => {
      console.log(`Received notification: ${notification}`);
      this.notifications.push(notification)
    })
    this._socketIoService.on('userNotification', (notifications) => {
      console.log(`Received userNotification: ${notifications}`);
      if (!notifications.read) {
        this.notifications.push(notifications)
      }
    })
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  getAllNotifications() {
    this._notificationService.fetchNotifications().subscribe({
      next: (res: any) => {
        console.log(res, "res");

        this.notifications = res.filter((noti: any) => noti.read === false)

      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  markAllAsRead() {
    this._notificationService.markAllAsRead().subscribe({
      next: (res: any) => {
        console.log(res, "res");
        this.notifications = [];
      },
      error: (err) => {
        console.error(err);
      }
    })
  }



  ngOnDestroy() {

    this._socketIoService.disconnect();
  }


}

