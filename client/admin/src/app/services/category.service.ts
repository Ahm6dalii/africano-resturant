import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getCategory(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCategory(category: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, category);
  }

  updateCategory(id: string, category: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
