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
      file: [''],
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
    this.selectedCategory = category;
    this.showConfirmationPopup = true; // Show the confirmation popup
    console.log(category , "Selected Category");
    }


  deleteConfirmed(categoryId: any): void {
    console.log(categoryId);
    this.categoryService.deleteCategory(categoryId).subscribe(
      () => {
        this.categories = this.categories.filter(category => category._id !== categoryId);
        this.showConfirmationPopup = false; 
        this.selectedCategory = null; //Reset
      },
      (error) => {
        console.error('Error deleting category:', error);
        this.showConfirmationPopup = false; // Hide 
        this.selectedCategory = null; // Reset 
      }
    );
  }

  cancelDelete(): void {
    this.showConfirmationPopup = false;
    this.selectedCategory = null;
  }

  addCategory(): void {
    const formData = new FormData();
    Object.keys(this.categoryForm.controls).forEach((key) => {
      const control = this.categoryForm.get(key);
      if (control.value instanceof File) {
        formData.append(key, control.value);
      } else if (typeof control.value === 'object') {
        Object.keys(control.value).forEach((subKey) => {
          formData.append(`${key}.${subKey}`, control.value[subKey]);
        });
      } else {
        formData.append(key, control.value);
      }
    });
    this.categoryService.createCategory(formData).subscribe(
      (createdCategory) => {
        this.categories.push(createdCategory); // Add new category to list
      },
      (error) => {
        console.error('Failed to add category:', error);
      }
    );
  }


  setLanguage(lang: string) {
    this.selectedLanguage = lang;
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.file) {
        this.categoryService.createCategory(res).subscribe((newCategory) => {
          console.log(newCategory, 'New Category Created');
          this.categories.push(newCategory);
        });
      }
    });
  }

  openEditCategoryDialog(category: any): void {
    console.log(category, 'Category for open edit');
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '400px',
      data: { ...category, id: category._id },
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res, 'ressssssssssssssss');
      if (res) {
        this.categoryService.updateCategory(res, res.id).subscribe(
          (updatedCategory) => {
            this.loadCategories();
            const index = this.categories.findIndex(
              (c) => c.id === updatedCategory.id
            );
            if (index !== -1) {
              this.categories[index] = updatedCategory;
            }
          },
          (error) => {
            console.error('Error updating category', error);
          }
        );
      }
    });
  }
}

