import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLinkService } from './api-link.service';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient,private _apiLink:ApiLinkService) {
    this.apiUrl= this._apiLink.apiLink.getValue() 
  }

  getAllFoods(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/foods?limit=100`);
  }

  createFood(food: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/foods`, food);
  }

  updateFood(id: string, food: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/api/foods/${id}`, food);
  }

  deleteFood(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/foods/${id}`);
  }
}
