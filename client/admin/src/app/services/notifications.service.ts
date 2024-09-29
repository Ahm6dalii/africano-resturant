import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiLinkService } from './api-link.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notifications$ = new BehaviorSubject<any[]>([]);

  userId: any = '';
  private apiUrl = '';

  constructor(private _apiLink: ApiLinkService, private _authService: AuthService) {
    this.apiUrl = this._apiLink.apiLink.getValue();
    this.userId = this._authService.tokenUserId.getValue();



  }

  _httpClient = inject(HttpClient);

  fetchNotifications(): Observable<any> {

    return this._httpClient.get<any[]>(`${this.apiUrl}/notifications/${this.userId}`);
  }

  getNotifications(): Observable<any> {
    return this.notifications$.asObservable();
  }

  markAllAsRead(): Observable<any> {

    return this._httpClient.patch(`${this.apiUrl}/notifications/update/${this.userId}`, {});
  }
}
