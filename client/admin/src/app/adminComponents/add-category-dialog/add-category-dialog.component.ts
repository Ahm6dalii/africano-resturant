import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-category-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-category-dialog.component.html',
  styleUrl: './add-category-dialog.component.scss',
})
export class AddCategoryDialogComponent {
  previewUrl: string;
  categoryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categoryForm = this.fb.group({
      name: this.fb.group({
        en: ['', Validators.required],
        ar: ['', Validators.required],
      }),
      description: this.fb.group({
        en: ['', Validators.required],
        ar: ['', Validators.required],
      }),
      file: [null, Validators.required],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.categoryForm.patchValue({ file: file });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const categoryData = { ...this.categoryForm.value, quantity: 1 };
      this.dialogRef.close(categoryData);
    }
  }
}
