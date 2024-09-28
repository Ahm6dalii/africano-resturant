import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ApiLinkService } from './api-link.service';

@Injectable({
  providedIn: 'root'
})
export class TotalsService {
  private apiUrl = '';
  constructor(private _apiLink: ApiLinkService, private _authService: AuthService) {
    this.apiUrl = this._apiLink.apiLink.getValue();
  }
  _httpClient = inject(HttpClient)

  getOrders(): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}/order`)
  }
  getFoods(): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}/api/foods`)
  }
  getCategories(): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}/api/categories`)
  }
  getUsers(): Observable<any> {
    const token = this._authService.userToken.getValue()
    const headers = new HttpHeaders({
      'token': token,
    });
    return this._httpClient.get<any>(`${this.apiUrl}/user-dashboard`, { headers })
  }
  getAllAmins(): Observable<any> {
    const token = this._authService.userToken.getValue()
    const headers = new HttpHeaders({
      'token': token,
    });
    return this._httpClient.get(`${this.apiUrl}/admin/all`, { headers });
  }

}
