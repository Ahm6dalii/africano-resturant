import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinkService } from './api-link.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiLink:string=""
  token:string
  constructor(private _http: HttpClient,private _apiLink:ApiLinkService,private _authService:AuthService) {

    this.apiLink= this._apiLink.apiLink.getValue() 
    this.token=this._authService.userToken.getValue()

   }



  getAllUsers(search='',limit,page=1): Observable<any> {
    console.log(search,limit,page);
    
    const headers = new HttpHeaders({
      'token':this.token,
    });
    return this._http.get(`${this.apiLink}/user-dashboard?search=${search}&limit=${limit}&page=${page}`, { headers });
  }


  deleteUser(id: any): Observable<any> {

    const headers = new HttpHeaders({
      'token':this.token,
    });
    return this._http.delete(`${this.apiLink}/user-dashboard/${id}`,{ headers });
  }

}
