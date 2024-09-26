import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinkService } from './api-link.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  apiUrl:string=""
  token:string
  constructor(private _http: HttpClient,private _apiLink:ApiLinkService,private _authService:AuthService) {
    this.apiUrl= this._apiLink.apiLink.getValue() 
    this.token=this._authService.userToken.getValue()
   }

   getDeliveryPrice(): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/delivery`);
  }
  updateDeliveryPrice(price: any): Observable<any> {
  const headers = new HttpHeaders({
    'token':this.token,
  });
    return this._http.post<any>(`${this.apiUrl}/delivery`, price,{ headers });
  }

}
