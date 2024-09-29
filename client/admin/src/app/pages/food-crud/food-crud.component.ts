import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { NgClass, NgFor, NgIf, SlicePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'; // Add this import

import { AddFoodDialogComponent } from '../../adminComponents/add-food-dialog/add-food-dialog.component';
import { EditFoodDialogComponent } from '../../adminComponents/edit-food-dialog/edit-food-dialog.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SocketIoService } from 'src/app/services/socket-io.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-food-crud',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule,
    NgClass,
    SlicePipe,
    ToastModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './food-crud.component.html',
  styleUrl: './food-crud.component.scss',
  providers: [MessageService]
})
export class FoodCrudComponent implements OnInit {
  selectedFood: any = null;
  foodForm: FormGroup;
  foods: any[] = [];
  editError: string = '';
  selectedLanguage: string = 'ar';
  admin: any
  currentPage = 1;
  limit = 10;
  totalPageCount = 0;
  pages = [];
  adminId: any
  showConfirmationPopup = false;
  constructor(
    private fb: FormBuilder,
    private foodService: FoodService,
    private dialog: MatDialog,
    private messageService: MessageService,
    private _socketIoService: SocketIoService, private _authService: AuthService,
  ) {
  }
  ngOnInit(): void {
    this.adminId = this._authService.tokenUserId.getValue();

    this._socketIoService.setUserId(this._authService.tokenUserInfo.getValue().userId);
    this._socketIoService.startListening();
    this._socketIoService.emit('register', { adminId: this.adminId, userId: null });
    this.foodForm = this.fb.group({
      name: this.fb.group({
        ar: [''],
        en: [''],
      }),
      category: [''],
      description: this.fb.group({
        ar: [''],
        en: [''],
      }),
      file: [''],
      quantity: [''],
      amount: this.fb.group({
        S: [''],
        L: [''],
        M: [''],
        R: [''],
      }),
      price: [''],
    });

    this.loadFoods();




  }

  loadFoods(): void {
    this.foodService
      .getAllFoods(this.currentPage, this.limit)
      .subscribe((food) => {

        this.foods = food.data;
        this.totalPageCount = Math.ceil(food.total / this.limit);
        this.pages = Array.from(
          { length: this.totalPageCount },
          (_, i) => i + 1
        );
      });
  }
  confirmDelete(food: any): void {
    this.showConfirmationPopup = true;
    this.selectedFood = food;
  }

  cancelDelete(): void {
    this.showConfirmationPopup = false;
    this.selectedFood = null;
  }

  deleteConfirmed(id: string): void {
    this.showConfirmationPopup = false;
    this.foodService.deleteFood(id).subscribe(
      () => {
        this.loadFoods();
        this.selectedFood = null;
        this.messageService.add({ severity: 'success', summary: 'success', detail: "deleted successfully" });
      },
      (error) => {
        console.error('Failed to add food:', error);
        this.showConfirmationPopup = false;
        this.messageService.add({ severity: 'error', summary: 'error', detail: error.error.message });
      }
    );
  }
  addFood(): void {
    const formData = new FormData();
    Object.keys(this.foodForm.controls).forEach((key) => {
      const control = this.foodForm.get(key);
      if (control.value instanceof File) {
        formData.append(key, control.value); // File
      } else if (typeof control.value === 'object') {
        // For group fields like name, category, etc.
        Object.keys(control.value).forEach((subKey) => {
          formData.append(`${key}.${subKey}`, control.value[subKey]);
        });
      } else {
        formData.append(key, control.value);
      }
    });


    this.foodService.createFood(formData).subscribe(

      (createdFood) => {

        this.foods.push(createdFood); // Add new food to list
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Food Added successfully" });

      },
      (error) => {
        console.error('Failed to add food:', error);
        this.messageService.add({ severity: 'error', summary: 'error', detail: "Fail to Add Food" });

      }
    );
  }

  updateFood(food: any): void {
    const updatedFood = this.foodForm.value;

    this.foodService.updateFood(food._id, updatedFood).subscribe(
      (response) => {
        const index = this.foods.findIndex((f) => f._id === food._id);
        if (index !== -1) {
          this.foods[index] = response;
        }
      },
      (error) => {
        console.error('Failed to update food:', error);
      }
    );
  }

  setLanguage(lang: string) {
    this.selectedLanguage = lang;
  }
  changePage(newPage): void {
    this.currentPage = newPage;
    this.loadFoods();
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadFoods();
    }
  }
  nextPage(): void {
    if (this.currentPage < this.totalPageCount) {
      this.currentPage++;
      this.loadFoods();
    }
  }

  openAddFoodDialog(): void {
    const dialogRef = this.dialog.open(AddFoodDialogComponent, {
      width: '600px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {
        this.foodService.createFood(result).subscribe(

          () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: "food update successfully" });
            this.loadFoods();

          },
          (error) => {
            console.error('Error :', error);
            this.messageService.add({ severity: 'error', summary: 'error', detail: error.error.message });

            this.editError = error?.error?.message

          }
        );
      }
    });
  }
  openEditFoodDialog(food: any): void {
    const dialogRef = this.dialog.open(EditFoodDialogComponent, {
      width: '400px',
      data: food,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {

        this.foodService
          .updateFood(food._id, result)
          .subscribe(
            (updatedFood) => {
              const index = this.foods.findIndex(
                (f) => f._id === updatedFood._id
              );
              this.foods[index] = updatedFood;
              this.messageService.add({ severity: 'success', summary: 'Success', detail: "food update successfully" });

            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'error', detail: error.error.message });

            }
          );
      }
    });
  }
}
