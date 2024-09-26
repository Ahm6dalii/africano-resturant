// import { HasTokenService } from './has-token.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from "jwt-decode";
import { ApiLinkService } from './api-link.service';
import { SocketIoService } from './socket-io.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit  {
  router = inject(Router);
  apiLink:string='';

  userToken:BehaviorSubject<string>= new BehaviorSubject('')
  userToken$=this.userToken.asObservable();

  tokenUserInfo:BehaviorSubject<any>= new BehaviorSubject({})
  tokenUserInfo$=this.userToken.asObservable();

  tokenUserId:BehaviorSubject<any>= new BehaviorSubject({})
  tokenUserId$=this.userToken.asObservable();

  isBrowser:boolean;
  constructor(private _http: HttpClient, @Inject(PLATFORM_ID) platfrom_Id:object,private _apiLink:ApiLinkService,private _socketIoService: SocketIoService) {
    this.isBrowser=isPlatformBrowser(platfrom_Id)
    if(this.isBrowser){
      if(localStorage.getItem('token'))
        
        try {
      this.tokenUserInfo.next(jwtDecode(localStorage.getItem('token')))
        } catch (error) {
          console.log(error);

        }
        this.userToken.next(localStorage.getItem('token'))
        this.tokenUserId.next(this.tokenUserInfo.getValue().userId)
      this._socketIoService.emit('register', this.tokenUserInfo.getValue().userId)
    }

    //set Api Link
    this.apiLink= this._apiLink.apiLink.getValue()
   }
  ngOnInit() {
    this._socketIoService.emit('register', this.tokenUserId)
  }

   saveUserToken(token:string){
    if(this.isBrowser)localStorage.setItem('token',token);
    this.userToken.next(token);
    this.tokenUserInfo.next(jwtDecode(localStorage.getItem('token')))
    this.tokenUserId.next(this.tokenUserInfo.getValue().userId)
    this._socketIoService.emit('register', this.tokenUserInfo.getValue().userId)
   }

  login(data:any):Observable<any>{
    return this._http.post(`${this.apiLink}/admin/signin`,data)
  }
  createAdmin(data: any): Observable<any> {
    const token = this.userToken.getValue();

    const headers = new HttpHeaders({
      'token':token,
    });
    return this._http.post(`${this.apiLink}/admin/create`, data, { headers });
  }
  getAllAmins(search,page,limit): Observable<any> {
    const token = this.userToken.getValue();
      console.log(this.apiLink,'this.apiLink');

    const headers = new HttpHeaders({
      'token':token,
    });
    return this._http.get(`${this.apiLink}/admin/all?search=${search}&page=${page}&limit=${limit}`, { headers });
  }

  getAllLogs(search,page,limit): Observable<any> {
    const token = this.userToken.getValue();
      console.log(this.apiLink,'this.apiLink');

    const headers = new HttpHeaders({
      'token':token,
    });
    return this._http.get(`${this.apiLink}/logs?search=${search}&page=${page}&limit=${limit}`, { headers });
  }

  deleteAdmin(id: any): Observable<any> {
    const token = this.userToken.getValue();

    const headers = new HttpHeaders({
      'token':token,
    });
    return this._http.delete(`${this.apiLink}/admin/delete/${id}`,{ headers });
  }

  updateAdmin(id: any,data): Observable<any> {
    const token = this.userToken.getValue();

    const headers = new HttpHeaders({
      'token':token,
    });
    return this._http.patch(`${this.apiLink}/admin/update/${id}`,data ,{ headers });
  }

  changePassword(data): Observable<any> {
    const token = this.userToken.getValue();
    const headers = new HttpHeaders({
      'token':token,
    });
    return this._http.patch(`${this.apiLink}/admin/update-pass/`,data ,{ headers });
  }



  logOut() {
    if(this.isBrowser)localStorage.removeItem("token");
    this.userToken.next(null);
    this.tokenUserInfo.next(null)
    this.tokenUserId.next('')

    this.router.navigate(["/login"])
  };
}