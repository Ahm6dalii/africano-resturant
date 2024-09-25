import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLinkService } from './api-link.service';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private _apiLink: ApiLinkService) {
    this.apiUrl = this._apiLink.apiLink.getValue();
  }

  getAllFoods(page: number, limit: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/foods?page=${page}&limit=${limit}`
    );
  }

  createFood(foodData: any): Observable<any> {
    console.log(foodData, 'Ahmed');
    const formData = new FormData();

    // formData.append('name', foodData.name);
    // formData.append('description', foodData.description);
    // formData.append('file', foodData.image);
    // formData.append('quantity', foodData.quantity);
    // formData.append('amount', foodData.amount);

    // formData.append('name', this.form.get('name').value);
    // formData.append('email', this.form.get('email').value);

    formData.append('category', foodData.category);

    console.log(formData, 'aaaaaaaaaaaadddddddddddddaaaaaaaaaaaaa');
    return this.http.post(`${this.apiUrl}/api/foods`,formData );
  }

  updateFood(id: string, food: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/api/foods/${id}`, food);
  }

  deleteFood(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/foods/${id}`);
  }
}
