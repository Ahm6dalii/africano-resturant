import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLinkService } from './api-link.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private _apiLink: ApiLinkService,
    private _authService: AuthService
  ) {
    this.apiUrl = this._apiLink.apiLink.getValue();
  }

  private getHeaders(): HttpHeaders {
    const token = this._authService.userToken.getValue();
    return new HttpHeaders({
      'token': token,
    });
  }

  getAllFoods(page: number, limit: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/foods?page=${page}&limit=${limit}`
    );
  }

  createFood(foodData: any): Observable<any> {
    const headers = this.getHeaders();


    // Create a new FormData object
    const formData = new FormData();

    for (const key in foodData) {
      if (foodData.hasOwnProperty(key)) {
        if (key === 'file') {
          // Append the file directly
          formData.append(key, foodData[key]);
        } else if (key === 'amount') {
          // Append amount as it is (ensure it's not an object)
          formData.append(key, JSON.stringify(foodData[key]));
        } else if (typeof foodData[key] === 'object' && !Array.isArray(foodData[key])) {
          // Append the object as a JSON string
          formData.append(key, JSON.stringify(foodData[key]));
        } else {
          // For other types, just append the value
          formData.append(key, foodData[key]);
        }
      }
    }

    return this.http.post(`${this.apiUrl}/api/foods`, formData, { headers });
  }

  updateFood(foodId: string, foodData: any): Observable<any> {
    const headers = this.getHeaders();


    // Create a new FormData object
    const formData = new FormData();

    for (const key in foodData) {
      if (foodData.hasOwnProperty(key)) {
        if (key === 'file') {
          // Append the file directly
          formData.append(key, foodData[key]);
        } else if (key === 'amount') {
          // Append amount as it is (ensure it's not an object)
          formData.append(key, JSON.stringify(foodData[key]));
        } else if (typeof foodData[key] === 'object' && !Array.isArray(foodData[key])) {
          // Append the object as a JSON string
          formData.append(key, JSON.stringify(foodData[key]));
        } else {
          // For other types, just append the value
          formData.append(key, foodData[key]);
        }
      }
    }

    return this.http.patch(`${this.apiUrl}/api/foods/${foodId}`, formData, { headers });
  }

  deleteFood(id: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/api/foods/${id}`, { headers });
  }
}
