import { inject, Injectable } from '@angular/core';
import { ApiLinkService } from './api-link.service';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SocketIoService } from './socket-io.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  read: BehaviorSubject<boolean> = new BehaviorSubject(false)

  private apiUrl = '';
  constructor(private _apiLink: ApiLinkService, private _authService: AuthService, private socketIoService: SocketIoService) {
    this.apiUrl = this._apiLink.apiLink.getValue();
  }



  _httpClient = inject(HttpClient)

  getUsersChat(id: string): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}/notifications/chat/${id}`)
  }
  updateChat(id: string): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}/notifications/chat/update/${id}`)
  }
  getUnReadChat(): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}/notifications?status=unread`)
  }

  changeRead(value: any) {
    this.read.next(value)
  }




}
