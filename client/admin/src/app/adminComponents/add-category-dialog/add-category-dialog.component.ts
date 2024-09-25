import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-category-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-category-dialog.component.html',
  styleUrl: './add-category-dialog.component.scss',
})
export class AddCategoryDialogComponent {
  categoryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categoryForm = this.fb.group({
      name: this.fb.group({
        ar: this.data?.name?.ar || '',
        en: this.data?.name?.en || '',
      }),
      // category: this.data?.category || '',

      description: this.fb.group({
        ar: this.data?.description?.ar || '',
        en: this.data?.description?.en || '',
      }),
      image: this.data?.image || '',
    })
  }
  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.categoryForm.patchValue({ image: file });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formValue = this.categoryForm.value;

      this.dialogRef.close(formValue);
    }
    console.log(this.categoryForm.value);
  }
}
