import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-category-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category-dialog.component.html',
  styleUrl: './edit-category-dialog.component.scss',
})
export class EditCategoryDialogComponent {
  categoryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categoryForm = this.fb.group({
      name: this.fb.group({
        ar: [data?.name?.ar],
        en: [data?.name?.en],
      }),

      description: this.fb.group({
        ar: [data?.description?.ar],
        en: [data?.description?.en],
      }),
      image: [data?.image],
    })
  }
  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.categoryForm.get('image').setValue(file);
  }
  onNoClick(): void {

    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.dialogRef.close(this.categoryForm.value);
    }
  }
}
