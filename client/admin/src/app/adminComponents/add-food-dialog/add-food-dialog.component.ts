import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { NgFor, CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-food-dialog',
  standalone: true,
  imports: [
    MatIconModule, MatButtonModule, MatSelectModule, MatInputModule,
    MatCardModule, MatFormFieldModule, ReactiveFormsModule, NgFor, CommonModule,
    MatCheckboxModule
  ],
  templateUrl: './add-food-dialog.component.html',
  styleUrl: './add-food-dialog.component.scss',
  providers: [MessageService]
})
export class AddFoodDialogComponent implements OnInit {
  foodForm: FormGroup;
  sizeOptions = ['S', 'M', 'L', 'R'];
  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddFoodDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.foodForm = this.fb.group({
      name: this.fb.group({
        en: ['', Validators.required],
        ar: ['', Validators.required],
      }),
      description: this.fb.group({
        en: ['', Validators.required],
        ar: ['', Validators.required],
      }),
      category: ['', Validators.required],
      file: [null, Validators.required],
      amount: this.fb.group({}),
    });

    // Initialize size checkboxes
    this.sizeOptions.forEach(size => {
      this.foodForm.addControl(size, this.fb.control(false));
    });
  }

  onSizeChange(size: string, event: any) {
    const amountGroup = this.foodForm.get('amount') as FormGroup;
    if (event.target.checked) {
      amountGroup.addControl(size, this.fb.control('', Validators.required));
    } else {
      amountGroup.removeControl(size);
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.foodForm.patchValue({ file: file });
    this.selectedFile = file;
  }

  onSubmit() {
    if (this.foodForm.valid) {
      const foodData = {
        ...this.foodForm.value,
        amount: Object.keys(this.foodForm.get('amount')?.value || {}).reduce((acc, key) => {
          acc[key.toUpperCase()] = parseFloat(this.foodForm.get('amount')?.get(key)?.value);
          return acc;
        }, {} as { [key: string]: number }),
        quantity: 1
      };
      this.dialogRef.close(foodData);
    }
  }
}
