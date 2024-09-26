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

@Component({
  selector: 'app-add-food-dialog',
  standalone: true,
  imports: [ MatIconModule, MatButtonModule,MatSelectModule,MatInputModule, MatCardModule,MatFormFieldModule,ReactiveFormsModule, NgFor, CommonModule],
  templateUrl: './add-food-dialog.component.html',
  styleUrl: './add-food-dialog.component.scss',
})
export class AddFoodDialogComponent implements OnInit {
  foodForm: FormGroup;
  sizeOptions = ['S', 'M', 'L', 'R'];
  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddFoodDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
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
      size: ['', Validators.required],
      amount: this.fb.group({}),
    });

    this.foodForm.get('size')?.valueChanges.subscribe((size) => {
      this.updateAmountControls(size);
    });
  }

  updateAmountControls(size: string) {
    const amountGroup = this.foodForm.get('amount') as FormGroup;
    // Remove existing controls
    Object.keys(amountGroup.controls).forEach((key) => {
      amountGroup.removeControl(key);
    });

    if (size === 'R') {
      amountGroup.addControl('R', this.fb.control('', Validators.required));
    } else {
      ['S', 'M', 'L'].forEach((s) => {
        amountGroup.addControl(s, this.fb.control('', Validators.required));
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.foodForm.patchValue({ file: file });
    this.selectedFile=file

  }

  onSubmit() {
    if (this.foodForm.valid) {
      const foodData = { ...this.foodForm.value, quantity: 1 };
      // console.log(foodData);
      this.dialogRef.close(foodData);
    }
  }

}
  
