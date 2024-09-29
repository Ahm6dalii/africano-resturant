import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { ChatService } from 'src/app/services/chat.service';
import { SocketIoService } from 'src/app/services/socket-io.service';
interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
})
export class FullComponent implements OnInit, OnDestroy {
  search: boolean = false;
  read: any
  unReadMessages: any[] = []
  userName: string = '';
  local: any
  private subscriptions: Subscription[] = [];
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private _authService: AuthService, private _chatService: ChatService, private socketIoService: SocketIoService) {
    this.userName = _authService.tokenUserInfo.getValue().username
    this.socketIoService.setUserId(this._authService.tokenUserInfo.getValue().userId);



    this.getUnReadChat();
    this.subscriptions.push(
      this._chatService.read.subscribe({
        next: (res) => {
          this.read = res;

        },
        error: (err) => console.error('Error in read subscription:', err)
      })
    );
  }

  ngOnInit() {

    this.socketIoService.startListening();
    this.socketIoService.on('connect', () => {

    });

    this.subscriptions.push(
      this.socketIoService.newMessage$.subscribe({
        next: (message) => {
          if (message) {

            if (message.senderModel !== "Admin") {
              this._chatService.changeRead(true);
            }
          }
        },
        error: (err) => console.error('Error in newMessage subscription:', err)
      })
    );

  }
  getUnReadChat() {
    this._chatService.getUnReadChat().subscribe({
      next: (res: any[]) => {
        this.unReadMessages = res
        if (this.unReadMessages.length > 0) {
          this._chatService.changeRead(true)
          // this.read = true
        }


      },
      error: (err) => {
        console.error(err);
        this.unReadMessages = [];
      }
    });
  }
  routerActive: string = 'activelink';

  sidebarMenu: sidebarMenu[] = [
    {
      link: '/home',
      icon: 'fa-house',
      menu: 'Dashboard',
    },
    {
      link: '/chat',
      icon: 'fa-chart-simple',
      menu: 'Chat',
    },
    {
      link: '/foods',
      icon: 'fa-pizza-slice',
      menu: 'Foods',
    },
    {
      link: '/categories',
      icon: 'fa-table',
      menu: 'Categories',
    },

    {
      link: '/orders',
      icon: 'fa-receipt',
      menu: 'Orders',
    },
    {
      link: '/delivery',
      icon: 'fa-motorcycle',
      menu: 'Delivery',
    },

    {
      link: "/create",
      icon: 'fa-user-plus',
      menu: "Create Admin",
    },
    {
      link: "/admins",
      icon: 'fa-user-tie',
      menu: "Admins List",
    },
    {
      link: "/users",
      icon: 'fa-users',
      menu: "Users List",
    },
    {
      link: "/logs",
      icon: 'fa-person-circle-check',
      menu: "Admins Logs",
    },

  ];



  logOut() {
    this._authService.logOut()
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.socketIoService.stopListening();
  }
}
