// import { Component, OnInit } from '@angular/core';
// import { Category } from 'src/app/models/category.model';
// import { CategoryService } from 'src/app/services/category.service';

// @Component({
//   selector: 'app-category-crud',
//   standalone: true,
//   imports: [],
//   templateUrl: './category-crud.component.html',
//   styleUrl: './category-crud.component.scss',
// })
// export class CategoryCrudComponent implements OnInit {
//   category: Category[] = [];
//   constructor(private categoryService: CategoryService) {}
//   ngOnInit(): void {
//     this.categoryService.getCategories().subscribe((category) => {
//       this.category = category;
//     });
//   }
//   getCategory(id: string): void { 
//     this.categoryService.getCategory(id).subscribe((category) => {
//       this.category.pop();
//     });
//   }
//   addCategory(category: Category): void {
//     this.categoryService.createCategory(category).subscribe(() => {
//       this.category.push(category);
//     });
//   }

//   deleteCategory(id: string): void {
//     this.categoryService.deleteCategory(id).subscribe(() => {
//       this.category = this.category.filter((category) => category.id !== id);
//     });
//   }
//   updateCategory(id: string, category: Category): void {
//     this.categoryService.updateCategory(id, category).subscribe(() => {
//       this.ngOnInit();
//     });
//   }
// }
