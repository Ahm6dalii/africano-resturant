import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLinkService } from './api-link.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'http://localhost:3000';
  constructor(private _apiLink:ApiLinkService) { 
    this.apiUrl= this._apiLink.apiLink.getValue();
  }
  _httpClient = inject(HttpClient)

  getOrders(): Observable<any> {
    return this._httpClient.get<any>(`${this.apiUrl}`)
  }

  getOrdersByStatus(status: string): Observable<any> {
    console.log(status, "status");

    return this._httpClient.get(`${this.apiUrl}/order/ordersByStatus?status=${status}`);
  }

  updateOrderStatus(id: string, body: any): Observable<any> {
    return this._httpClient.patch(`${this.apiUrl}/order/updateordersByStatus/${id}`, body);
  }


}
