// import { HasTokenService } from './has-token.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router = inject(Router);
  constructor(private _http: HttpClient,) { }

  login(data:any):Observable<any>{
    return this._http.post("http://localhost:3000/admin/signin",data)
  }


  logOut() {
    localStorage.removeItem("token");
    // this._hasToken.hasToken.next(false);
    this.router.navigate(["/home"])
  };
}