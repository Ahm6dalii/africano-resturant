import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() { }
  _httpClient = inject(HttpClient)

  getOrders(): Observable<any> {

    return this._httpClient.get<any>(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  }
}
