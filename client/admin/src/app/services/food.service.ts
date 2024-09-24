import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private apiUrl = 'http://localhost:3000/api/foods';

  constructor(private http: HttpClient) {}

  getAllFoods(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }

  createFood(food: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, food);
  }

  updateFood(id: string, food: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, food);
  }

  deleteFood(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
