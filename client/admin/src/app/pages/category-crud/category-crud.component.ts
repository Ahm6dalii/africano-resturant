import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-crud',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, SlicePipe],
  templateUrl: './category-crud.component.html',
  styleUrl: './category-crud.component.scss',
})
export class CategoryCrudComponent implements OnInit {
  categories: any[] = [];

  isPopupOpen = false;
  isAddPopupOpen = false;
  selectedCategory: any = null;
  categoryForm: FormGroup;

  selectedLanguage: string = 'ar';

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
      name: [''],
      description: [''],
      image: [''],
    });
  }
  ngOnInit(): void {
    this.loadCategories();
  }
  loadCategories() {
    this.categoryService.getCategories().subscribe((category) => {
      console.log(category);
      this.categories = category;
    });
  }
  getCategory(id: string): void {
    this.categoryService.getCategory(id).subscribe((category) => {
      this.categories.pop();
    });
  }
  addCategory(): void {
    const category = this.categoryForm.value;
    this.categoryService.createCategory(category).subscribe(() => {
      this.categories.push(category);
      this.categoryForm.reset();
      this.isAddPopupOpen = false;
    });
  }

  deleteCategory(id: string): void {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter(
        (category) => category.id !== id
      );
    });
  }
  updateCategory(category: any): void {
    this.categoryService
      .updateCategory(category._id, category)
      .subscribe((updatedCategory) => {
        const index = this.categories.findIndex(
          (f) => f._id === updatedCategory._id
        );
        this.categories[index] = updatedCategory;
        this.isPopupOpen = false;
      });
  }

  setLanguage(lang: string) {
    this.selectedLanguage = lang;
  }
  togglePopup(category: any): void {
    this.selectedCategory = category;
    this.isPopupOpen = !this.isPopupOpen;
  }
  toggleAddPopup(): void {
    this.isAddPopupOpen = !this.isAddPopupOpen;
    this.categoryForm.reset();
  }
}
