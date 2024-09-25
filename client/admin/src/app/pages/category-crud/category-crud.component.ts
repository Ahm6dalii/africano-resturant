import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { NgClass,NgFor, NgIf, SlicePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; // Add this import
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryDialogComponent } from 'src/app/adminComponents/add-category-dialog/add-category-dialog.component';
import { EditCategoryDialogComponent } from 'src/app/adminComponents/edit-category-dialog/edit-category-dialog.component';

@Component({
  selector: 'app-category-crud',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule,
    SlicePipe,
    MatIconModule,
    NgClass,
  ],
  templateUrl: './category-crud.component.html',
  styleUrl: './category-crud.component.scss',
})
export class CategoryCrudComponent implements OnInit {
  selectedCategory: any = null;
  categoryForm: FormGroup;
  categories: any[] = [];

  selectedLanguage: string = 'ar';

  showConfirmationPopup = false;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: this.fb.group({
        ar: [''],
        en: [''],
      }),
      description: this.fb.group({
        ar: [''],
        en: [''],
      }),
      image: [''],
    });

    this.loadCategories();

    console.log(this.categoryForm);
    console.log(this.categoryForm.get('amount'));
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((category) => {
      this.categories = category;
      console.log(this.categories);
    });
  }
  confirmDelete(category: any): void {
    this.showConfirmationPopup = true;
    this.selectedCategory = category;
  }

  cancelDelete(): void {
    this.showConfirmationPopup = false;
    this.selectedCategory = null;
  }

  deleteConfirmed(id: string): void {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.categories = this.categories.filter(
        (category) => category._id !== id
      );
      this.showConfirmationPopup = false;
      this.selectedCategory = null;
    });
  }
  // addCategory(): void {
  //   const formData = new FormData();
  //   Object.keys(this.categoryForm.controls).forEach((key) => {
  //     const control = this.categoryForm.get(key);
  //     if (control.value instanceof File) {
  //       formData.append(key, control.value);
  //     } else if (typeof control.value === 'object') {
  //       Object.keys(control.value).forEach((subKey) => {
  //         formData.append(`${key}.${subKey}`, control.value[subKey]);
  //       });
  //     } else {
  //       formData.append(key, control.value);
  //     }
  //   });
  //   this.categoryService.createCategory(formData).subscribe(
  //     (createdCategory) => {
  //       this.categories.push(createdCategory); // Add new category to list
  //     },
  //     (error) => {
  //       console.error('Failed to add category:', error);
  //     }
  //   );
  // }

  updateCategory(category: any): void {
    const updatedCategory = this.categoryForm.value;

    this.categoryService
      .updateCategory(category._id, updatedCategory)
      .subscribe(
        (response) => {
          const index = this.categories.findIndex(
            (f) => f._id === category._id
          );
          if (index !== -1) {
            this.categories[index] = response;
          }
        },
        (error) => {
          console.error('Failed to update categories:', error);
        }
      );
  }

  setLanguage(lang: string) {
    this.selectedLanguage = lang;
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '400px',
      data: {}, // No data for adding a new category
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log('Hello From AddCategoryDialog');
      console.log(res);
      if (res) {
        this.categoryService.createCategory(res).subscribe((newCategory) => {
          this.categories.push(newCategory);
        });
      }
    });
  }

  openEditCategoryDialog(category: any): void {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '400px',
      data: category,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService
          .updateCategory(category._id, result)
          .subscribe((updatedCategory) => {
            const index = this.categories.findIndex(
              (f) => f._id === updatedCategory._id
            );
            this.categories[index] = updatedCategory;
          });
      }
    });
  }
}
