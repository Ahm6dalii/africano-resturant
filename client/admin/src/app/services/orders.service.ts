import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLinkService } from './api-link.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = '';
  constructor(private _apiLink: ApiLinkService, private _authService: AuthService) {
    this.apiUrl = this._apiLink.apiLink.getValue();
  }
  _httpClient = inject(HttpClient)

  getOrders(): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}`)
  }

  getOrdersByStatus(status: string): Observable<any> {


    return this._httpClient.get(`${this.apiUrl}/order/ordersByStatus?status=${status}`);
  }

  updateOrderStatus(id: string, body: any): Observable<any> {
    return this._httpClient.patch(`${this.apiUrl}/order/updateordersByStatus/${id}`, body);
  }

  deleteOrder(id: string): Observable<any> {
    const token = this._authService.userToken.getValue()
    const headers = new HttpHeaders({
      'token': token,
    });
    return this._httpClient.delete(`${this.apiUrl}/order/deleteOrder/${id}`, { headers });
  }


  getWeeklyEarnings(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/order/earnings/weekly`)
  }


  getMonthlyEarnings(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/order/earnings/monthly`)
  }


  getYearlyEarnings(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/order/earnings/yearly`)
  }


  getTopSoldItemsWeekly(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/order/soldItem/weekly`)
  }


  getTopSoldItemsMonthly(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/order/soldItem/monthly`)
  }


  getTopSoldItemsYearly(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/order/soldItem/yearly`)
  }


  getWeeklyPaymentMethodCounts(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/order/payment-method-counts/weekly`)
  }


  getMonthlyPaymentMethodCounts(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/order/payment-method-counts/monthly`)
  }


  getYearlyPaymentMethodCounts(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/order/payment-method-counts/yearly`)
  }

}
