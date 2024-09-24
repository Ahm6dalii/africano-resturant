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
  createAdmin(data: any): Observable<any> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vbWVuIiwicGVybWlzc2lvbnMiOltdLCJpc1N1cGVyQWRtaW4iOnRydWUsImlhdCI6MTcyNzEzNTc2N30.h77ipF2DvRE2R7yjxwH2QBlFpkhr8eJgoHC7skRGVG4';
    const headers = new HttpHeaders({
      'token':token,
    });
    return this._http.post("http://localhost:3000/admin/create", data, { headers });
  }
  getAllAmins(data: any): Observable<any> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vbWVuIiwicGVybWlzc2lvbnMiOltdLCJpc1N1cGVyQWRtaW4iOnRydWUsImlhdCI6MTcyNzEzNTc2N30.h77ipF2DvRE2R7yjxwH2QBlFpkhr8eJgoHC7skRGVG4';
    const headers = new HttpHeaders({
      'token':token,
    });
    return this._http.get("http://localhost:3000/admin/all", { headers });
  }
  deleteAdmin(id: any): Observable<any> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vbWVuIiwicGVybWlzc2lvbnMiOltdLCJpc1N1cGVyQWRtaW4iOnRydWUsImlhdCI6MTcyNzEzNTc2N30.h77ipF2DvRE2R7yjxwH2QBlFpkhr8eJgoHC7skRGVG4';
    const headers = new HttpHeaders({
      'token':token,
    });
    return this._http.delete(`http://localhost:3000/admin/delete/${id}`,{ headers });
  }
  updateAdmin(id: any,data): Observable<any> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vbWVuIiwicGVybWlzc2lvbnMiOltdLCJpc1N1cGVyQWRtaW4iOnRydWUsImlhdCI6MTcyNzEzNTc2N30.h77ipF2DvRE2R7yjxwH2QBlFpkhr8eJgoHC7skRGVG4';
    const headers = new HttpHeaders({
      'token':token,
    });
    return this._http.patch(`http://localhost:3000/admin/update/${id}`,data ,{ headers });
  }



  logOut() {
    localStorage.removeItem("token");
    // this._hasToken.hasToken.next(false);
    this.router.navigate(["/home"])
  };
}
