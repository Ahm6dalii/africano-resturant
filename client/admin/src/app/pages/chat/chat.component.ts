import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ToastModule } from 'primeng/toast';

import { AuthService } from './../../services/auth.service';
import { SocketIoService } from 'src/app/services/socket-io.service';
import { UsersService } from 'src/app/services/users.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    ToastModule
  ],
  template: `
    <div class="flex flex-col md:flex-row h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <!-- User list sidebar -->
      <div class="w-full md:w-1/3 lg:w-1/4 bg-white shadow-lg md:rounded-l-xl overflow-hidden flex flex-col">
        <div class="p-4 border-b bg-gray-50">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Users</h2>
          <div class="relative">
            <mat-icon class="absolute left-3 top-3 text-gray-400">search</mat-icon>
            <input [(ngModel)]="searchTerm" (ngModelChange)="getUsers()"
                   class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                   placeholder="Search users...">
          </div>
        </div>
        <div class="flex-grow overflow-y-auto">
          <mat-list>
            <mat-list-item *ngFor="let user of sortedUserList"
                           (click)="selectUser(user._id)"
                           class="hover:bg-blue-50 cursor-pointer transition duration-150 ease-in-out mb-2">
              <div class="flex items-center p-3">
                <div class="relative">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg mr-4 shadow">
                    {{ user.name.trim().charAt(0).toUpperCase() }}
                  </div>
                  <div *ngIf="user.hasNewMessage" class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                <div>
                  <div class="font-semibold text-gray-800">{{ user.name }}</div>
                  <div class="text-sm text-gray-500">No: {{ user.phone }}</div>
                </div>
              </div>
            </mat-list-item>
          </mat-list>
        </div>
        <div class="border-t flex justify-center">
          <mat-paginator [length]="userList.length"
                         [pageSize]="pageSize"
                         [pageSizeOptions]="[5, 10, 25, 100]"
                         (page)="onPageChange($event)"
                         class="w-full">
          </mat-paginator>
        </div>
      </div>

      <!-- Chat area -->
       @if(currentUserId){


      <div class="flex-1 flex flex-col bg-white md:rounded-r-xl shadow-lg">
        <div *ngIf="currentUserId" class="p-4 border-b bg-white shadow">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold mr-3 shadow">
              {{ getUserInitial(currentUserId) }}
            </div>
            <div>
              <div class="font-semibold text-lg text-gray-800">{{ getUserName(currentUserId) }}</div>
              <div class="text-sm text-gray-500">ID: {{ currentUserId }}</div>
            </div>
          </div>
        </div>
        <div class="flex-1 p-4 md:p-6 overflow-y-auto bg-gray-50" #chatContainer>
          <div *ngFor="let message of chat"
               class="mb-4 md:mb-6 flex"
               [ngClass]="{
                 'justify-start': message.senderModel === 'Admin',
                 'justify-end': message.senderModel !== 'Admin'
               }">
            <div class="flex max-w-xs md:max-w-md"
                 [ngClass]="{
                   'flex-row': message.senderModel === 'Admin',
                   'flex-row-reverse': message.senderModel !== 'Admin'
                 }">
                 @if(message.sender.image){
<img class="size-8 rounded-full object-cover" src={{message.sender.image}} alt="">
                 } @else{
                  <div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm mr-2">
                {{ (message.senderModel === 'Admin' ? message.sender.username : message.sender.name).charAt(0) }}
              </div>
                 }

              <div>
                <div class="font-bold mb-1 text-gray-700">
                  {{ message.senderModel === 'Admin' ? message.sender.username : message.sender.name }}
                </div>
                <div class="p-2 md:p-3 rounded-lg shadow-md break-words"
                     [ngClass]="{
                       'bg-blue-500 text-white': message.senderModel === 'Admin',
                       'bg-white': message.senderModel !== 'Admin'
                     }">
                  <p class="text-sm break-words w-full" style="min-width: 100px; max-width: 300px;">{{message.text}}</p>
                </div>
                <div class="text-xs text-gray-500 mt-1">{{ message.createdAt | date:'short' }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-3 md:p-4 bg-white border-t">
          <form [formGroup]="replyForm" (ngSubmit)="sendReply()" class="flex items-center">
            <input type="text" formControlName="message"
                   class="flex-1 p-2 md:p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                   placeholder="Type a message...">
            <button type="submit"
                    [disabled]="!replyForm.valid"
                    class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 md:p-3 rounded-r-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out h-full disabled:opacity-50">
              <mat-icon class="text-base md:text-lg">send</mat-icon>
            </button>
          </form>
        </div>

      </div>
    }
    </div>
  `,
  styles: [`
    /* You can add any additional styles here */
  `]
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  chat: any[] = [];
  replyForm: FormGroup;
  currentUserId: string | null = null;
  adminId: any;
  userList: any[] = [];
  searchTerm: string = "";
  currentPage: number = 1;
  pageSize: number = 100;
  unReadMessages: any[] = []

  constructor(
    private fb: FormBuilder,
    private socketIoService: SocketIoService,
    private _authService: AuthService,
    private _usersService: UsersService,
    private _chatService: ChatService
  ) {

    this.replyForm = this.fb.group({
      message: ['', Validators.required],
    });
    this.getUnReadChat();
    this._chatService.changeRead(false)

  }

  ngOnInit() {
    this.getUsers();
    this.adminId = this._authService.tokenUserId.getValue();


    this.socketIoService.emit('register', { adminId: this.adminId, userId: null });

    this.socketIoService.startListening();
    this.socketIoService.on('connect', () => {

    });

    this.socketIoService.newMessage$.subscribe((message) => {
      if (message) {

        this.chat.push(message);
        this.markUserWithNewMessage(message.sender._id);
        this.scrollToBottom();
        this.getUnReadChat();
        // this._chatService.changeRead(false);
      }
    });

    this.socketIoService.on('disconnect', () => {

    });
    this.getUnReadChat();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  sendReply() {
    if (this.replyForm.valid && this.currentUserId) {
      this.socketIoService.emit('sendMessage', {
        userId: this.currentUserId,
        adminId: this.adminId,
        message: this.replyForm.value.message
      });
      this.functionn(this.currentUserId)
      this.replyForm.reset();


    }
  }

  getUsers() {
    this._usersService.getAllUsers(this.searchTerm, this.pageSize, this.currentPage).subscribe({
      next: (res: any) => {
        let { data, total, totalPages, page, limit } = res;

        this.userList = data.map((user: any) => ({ ...user, hasNewMessage: false }));
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  getUnReadChat() {
    this._chatService.getUnReadChat().subscribe({
      next: (res: any[]) => {
        this.unReadMessages = res
        const usersWithUnreadMessages = new Set();
        // Collect users with unread messages
        res.forEach(chat => {
          chat.messages.forEach(message => {
            if (!message.read && message.senderModel === "User") {
              usersWithUnreadMessages.add(message.sender._id);
            }
          });
        });

        // Update userList based on unread messages
        this.userList.forEach(user => {
          if (usersWithUnreadMessages.has(user._id)) {
            user.hasNewMessage = true;
            // Move user to top only if they are not already at the top
            this.userList.splice(this.userList.indexOf(user), 1);
            this.userList.unshift(user);
          } else {
            user.hasNewMessage = false; // Reset if they don't have new messages
          }
        });

        // Optional: Add new users who sent unread messages
        usersWithUnreadMessages.forEach(userId => {
          if (!this.userList.find(u => u._id === userId)) {
            const newUser = res.find(chat => chat.messages.some(msg => msg.sender._id === userId && msg.senderModel === "User"))?.user;
            if (newUser) {
              this.userList.unshift({
                _id: userId,
                name: newUser.name,
                image: newUser.image,
                hasNewMessage: true
              });
            }
          }
        });
      },
      error: (err) => {
        console.error(err);
        this.chat = [];
      }
    });
  }


  updateChatMessage(messageId) {
    this._chatService.updateChat(messageId).subscribe({
      next: (res: any) => {
      },
      error: (err) => {
        console.error(err);
        this.chat = [];
      }
    });
  }

  getUserChat(currentUserId: string) {
    this._chatService.getUsersChat(currentUserId).subscribe({
      next: (res: any) => {

        if (res && res.messages) {
          this.chat = res.messages;
          this.scrollToBottom();
        } else {
          this.chat = [];
          console.warn('No chat messages found for this user.');
        }
      },
      error: (err) => {
        console.error(err);
        this.chat = [];
      }
    });
  }

  selectUser(userId: string) {
    this.currentUserId = userId;
    this.getUserChat(this.currentUserId);



    this.clearNewMessageIndicator(userId);
    this.functionn(userId)
    this._chatService.changeRead(false)

  }
  functionn(userId) {
    this.unReadMessages = this.unReadMessages.filter((mes) => mes.user._id === userId)

    const messageIds = this.unReadMessages.flatMap((userMessages) =>
      userMessages.messages.map((message) => message._id)
    );



    messageIds.forEach((messageId) => {
      this.updateChatMessage(messageId);
    });



  }
  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getUsers();
  }

  getUserName(userId: string): string {
    const user = this.userList.find(u => u._id === userId);
    return user ? user.name : 'Unknown User';
  }

  getUserInitial(userId: string): string {
    const name = this.getUserName(userId);
    return name.trim().charAt(0).toUpperCase()
  }

  markUserWithNewMessage(userId: string) {
    const userIndex = this.userList.findIndex(u => u._id === userId);
    if (userIndex !== -1) {
      this.userList[userIndex].hasNewMessage = true;
      // Move user to the top of the list
      const user = this.userList.splice(userIndex, 1)[0];
      this.userList.unshift(user);
    }
  }

  clearNewMessageIndicator(userId: string) {
    const user = this.userList.find(u => u._id === userId);
    if (user) {
      user.hasNewMessage = false;
    }
  }

  get sortedUserList() {
    return this.userList.sort((a, b) => {
      if (a.hasNewMessage === b.hasNewMessage) {
        return 0;
      }
      return a.hasNewMessage ? -1 : 1;
    });
  }




}
