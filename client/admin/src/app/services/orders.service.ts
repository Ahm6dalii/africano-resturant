import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'http://localhost:3000/order';
  constructor() { }
  _httpClient = inject(HttpClient)

  getOrders(): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}`)
  }

  getOrdersByStatus(status: string): Observable<any> {
    console.log(status, "status");

    return this._httpClient.get(`${this.apiUrl}/ordersByStatus?status=${status}`);
  }

  updateOrderStatus(id: string, body: any): Observable<any> {
    return this._httpClient.patch(`${this.apiUrl}/updateordersByStatus/${id}`, body);
  }


}
