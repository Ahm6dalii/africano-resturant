import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
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
export class FullComponent implements OnInit {
  search: boolean = false;
  read: any
  unReadMessages: any[] = []
  userName: string = '';
  local: any
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private _authService: AuthService, private _chatService: ChatService, private socketIoService: SocketIoService) {
    this.userName = _authService.tokenUserInfo.getValue().username
    console.log(_authService.tokenUserInfo.getValue(), 'pppppppppppppp');
    this.getUnReadChat();
    this._chatService.read.subscribe({
      next: (res) => {
        this.read = res
        console.log(this.read);

      }
    })
  }

  ngOnInit() {

    this.socketIoService.startListening();
    this.socketIoService.on('connect', () => {
      console.log('Connected to socket server');
    });

    this.socketIoService.newMessage$.subscribe((message) => {
      if (message) {
        console.log(message, "New message received");
        if (message.senderModel !== "Admin") {
          this._chatService.changeRead(true)
        }
      }
    });

  }
  getUnReadChat() {
    this._chatService.getUnReadChat().subscribe({
      next: (res: any[]) => {
        this.unReadMessages = res
        if (this.unReadMessages.length > 0) {
          this._chatService.changeRead(true)
          // this.read = true
        }
        console.log(this.unReadMessages, "this.unReadMessages");

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
}
