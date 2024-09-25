import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-food-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-food-dialog.component.html',
  styleUrl: './edit-food-dialog.component.scss',
})
export class EditFoodDialogComponent {
  foodForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditFoodDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.foodForm = this.fb.group({
      name: this.fb.group({
        ar: data?.name?.ar,
        en: data?.name?.en,
      }),
      category: this.fb.group({
        ar: data?.category?.ar,
        en: data?.category?.en,
      }),
      description: this.fb.group({
        ar: data?.description?.ar,
        en: data?.description?.en,
      }),
      image: data?.image,
      quantity: data?.quantity,
      amount: this.fb.group({
        S: data?.amount?.S,
        L: data?.amount?.L,
        M: data?.amount?.M,
        R: data?.amount?.R,
      }),
    });
  }
  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.foodForm.get('image').setValue(file);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.foodForm.valid) {
      this.dialogRef.close(this.foodForm.value);
    }
  }
}
