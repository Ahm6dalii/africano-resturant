// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Category } from '../models/category.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class CategoryService {
//   private apiUrl = 'http://localhost:5173/api/categories';

//   constructor(private http: HttpClient) {}

//   getCategories(): Observable<Category[]> {
//     return this.http.get<Category[]>(this.apiUrl);
//   }

//   getCategory(id: string): Observable<Category> {
//     return this.http.get<Category>(`${this.apiUrl}/${id}`);
//   }

//   createCategory(category: Category): Observable<Category> {
//     return this.http.post<Category>(this.apiUrl, category);
//   }

//   updateCategory(id: string, category: Category): Observable<Category> {
//     return this.http.put<Category>(`${this.apiUrl}/${id}`, category);
//   }

//   deleteCategory(id: string): Observable<Category> {
//     return this.http.delete<Category>(`${this.apiUrl}/${id}`);
//   }
// }
