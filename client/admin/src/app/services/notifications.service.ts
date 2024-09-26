import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiLinkService } from './api-link.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notifications$ = new BehaviorSubject<any[]>([]);

  userId: any = '66eb4c46d8ebd674d6f317f6';
  private apiUrl = 'http://localhost:3000';

  constructor(private _apiLink:ApiLinkService) {
    this.apiUrl= this._apiLink.apiLink.getValue();

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
