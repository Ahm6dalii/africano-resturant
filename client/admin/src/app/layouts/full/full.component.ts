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
    this.socketIoService.on('newMessage', (message) => {
      console.log(message, "lets have a look");
      if (message.senderModel !== "Admin") {
        this._chatService.changeRead(true)
      }
      // this.read = true

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
      icon: 'dashboard', // Updated icon
      menu: 'Dashboard',
    },
    {
      link: '/chat',
      icon: 'new',
      menu: 'Chat',
    },
    {
      link: '/foods',
      icon: 'restaurant', // Updated icon
      menu: 'Foods',
    },
    {
      link: '/categories',
      icon: 'category', // Updated icon
      menu: 'Categories',
    },

    // {
    //   link: "/button",
    //   icon: "disc",
    //   menu: "Buttons",
    // },
    // {
    //   link: "/forms",
    //   icon: "layout",
    //   menu: "Forms",
    // },
    // {
    //   link: "/alerts",
    //   icon: "info",
    //   menu: "Alerts",
    // },
    // {
    //   link: "/grid-list",
    //   icon: "file-text",
    //   menu: "Grid List",
    // },
    // {
    //   link: "/menu",
    //   icon: "menu",
    //   menu: "Menus",
    // },
    // {
    //   link: "/table",
    //   icon: "grid",
    //   menu: "Tables",
    // },
    // {
    //   link: "/expansion",
    //   icon: "divide-circle",
    //   menu: "Expansion Panel",
    // },
    // {
    //   link: "/chips",
    //   icon: "award",
    //   menu: "Chips",
    // },
    // {
    //   link: "/tabs",
    //   icon: "list",
    //   menu: "Tabs",
    // },
    {
      link: '/orders',
      icon: 'shopping_cart', // Updated icon
      menu: 'Orders',
    },
    {
      link: '/delivery',
      icon: 'local_shipping', // Updated icon
      menu: 'Delivery',
    },
    // {
    //   link: '/login',
    //   icon: 'list',
    //   menu: 'Login',
    // },
    {
      link: "/create",
      icon: 'person_add', // Updated icon
      menu: "Create Admin",
    },
    {
      link: "/admins",
      icon: 'history', // Updated icon
      menu: "Admins List",
    },
    {
      link: "/users",
      icon: 'group', // Updated icon
      menu: "Users List",
    },
    {
      link: "/logs",
      icon: 'receipt', // Updated icon
      menu: "Admins Logs",
    },
    // {
    //   link: "/progress",
    //   icon: "bar-chart-2",
    //   menu: "Progress Bar",
    // },
    // {
    //   link: "/toolbar",
    //   icon: "voicemail",
    //   menu: "Toolbar",
    // },
    // {
    //   link: "/progress-snipper",
    //   icon: "loader",
    //   menu: "Progress Snipper",
    // },
    // {
    //   link: "/tooltip",
    //   icon: "bell",
    //   menu: "Tooltip",
    // },
    // {
    //   link: "/snackbar",
    //   icon: "slack",
    //   menu: "Snackbar",
    // },
    // {
    //   link: "/slider",
    //   icon: "sliders",
    //   menu: "Slider",
    // },
    // {
    //   link: "/slide-toggle",
    //   icon: "layers",
    //   menu: "Slide Toggle",
    // },
  ];



  logOut() {
    this._authService.logOut()
  }
}
