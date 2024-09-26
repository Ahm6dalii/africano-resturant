import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-food-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgFor,
    NgIf
  ],
  templateUrl: `./edit-food-dialog.component.html`,

  styleUrl: './edit-food-dialog.component.scss',

})
export class EditFoodDialogComponent implements OnInit {
  foodForm: FormGroup;
  amountSizes: string[] = [];
  currentImageUrl: string | null = null;
  newImageFile: File | null = null;
  currentCatogery:string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditFoodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.amountSizes = Object.keys(this.data.amount);
    this.currentImageUrl = this.data.imageUrl || null;
    this.currentCatogery = this.data.category || null;

    this.foodForm = this.fb.group({
      nameEn: [this.data.name.en, Validators.required],
      nameAr: [this.data.name.ar, Validators.required],
      descriptionEn: [this.data.description.en],
      descriptionAr: [this.data.description.ar],
      category: [this.data.category, Validators.required], // This should set the value correctly
      quantity: [this.data.quantity, [Validators.required, Validators.min(0)]],
      amount: this.fb.group(
        Object.fromEntries(
          this.amountSizes.map(size => [size, [this.data.amount[size]]])
        )
      )
    });
    

  
  }

 

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.newImageFile = file;
      // Create a preview of the new image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.currentImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  compareCategory(category1: any, category2: any): boolean {
    return category1 && category2 ? category1 === category2 : category1 === category2;
  }

  onSave(): void {
    if (this.foodForm.valid) {
      const updatedFood = {
        name: {
          en: this.foodForm.get('nameEn').value,
          ar: this.foodForm.get('nameAr').value
        },
        description: {
          en: this.foodForm.get('descriptionEn').value,
          ar: this.foodForm.get('descriptionAr').value
        },
        category: this.foodForm.get('category').value,
        quantity: this.foodForm.get('quantity').value,
        amount: this.foodForm.get('amount').value,
        file: this.newImageFile 
      };
      this.dialogRef.close(updatedFood);
    }
  }
}