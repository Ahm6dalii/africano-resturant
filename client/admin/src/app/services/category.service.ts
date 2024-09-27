import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

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
  createCategory(categoryData: any): Observable<any> {
    const formData = new FormData();
    formData.append('name[en]', categoryData.name.en);
    formData.append('name[ar]', categoryData.name.ar);
    formData.append('description[en]', categoryData.description.en);
    formData.append('description[ar]', categoryData.description.ar);
    formData.append('file', categoryData.file);
    formData.append('quantity', categoryData.quantity.toString());

    return this.http.post(this.apiUrl, formData);
  }

  updateCategory(categoryData: any, id: string): Observable<any> {
    const formData = new FormData();
    formData.append('name[en]', categoryData.name.en);
    formData.append('name[ar]', categoryData.name.ar);
    formData.append('description[en]', categoryData.description.en);
    formData.append('description[ar]', categoryData.description.ar);

    if (categoryData.file instanceof File) {
      formData.append('file', categoryData.file, categoryData.file.name);
    }

    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }
  deleteCategory(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
