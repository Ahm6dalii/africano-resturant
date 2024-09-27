import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-category-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-category-dialog.component.html',
  styleUrl: './edit-category-dialog.component.scss',
})
export class EditCategoryDialogComponent {
  categoryForm: FormGroup;
  selectedFile: File | null = null;
  constructor(
    public dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize form with data or empty values
    this.categoryForm = this.fb.group({
      name: this.fb.group({
        en: [data?.name?.en || '', Validators.required],
        ar: [data?.name?.ar || '', Validators.required],
      }),
      description: this.fb.group({
        en: [data?.description?.en || '', Validators.required],
        ar: [data?.description?.ar || '', Validators.required],
      }),
    });
  }

  onFileChange(event: any) {
    const file = event.target?.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Handle dialog cancellation
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Handle form submission
  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formValue = this.categoryForm.value;
      const categoryData = {
        id: this.data._id,
        name: formValue.name,
        description: formValue.description,
        file: this.selectedFile, // Use the selectedFile property
      };
      this.dialogRef.close(categoryData);
    }
  }
}
