import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { NgClass, NgFor, NgIf, SlicePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; // Add this import
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-food-crud',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule,
    NgClass,
    SlicePipe,
    MatIconModule,
  ],
  templateUrl: './food-crud.component.html',
  styleUrl: './food-crud.component.scss',
})
export class FoodCrudComponent implements OnInit {
  isPopupOpen = false;
  isAddPopupOpen = false;
  selectedFood: any = null;
  foodForm: FormGroup;
  foods: any[] = [];

  selectedLanguage: string = 'ar';

  currentPage = 1;
  limit = 10;
  totalPageCount = 0;
  pages = [];

  constructor(private fb: FormBuilder, private foodService: FoodService) {
    this.foodForm = this.fb.group({
      name: [''],
      category: [''],
      description: [''],
      image: [''],
    });
  }
  ngOnInit(): void {
    this.loadFoods();
    console.log(this.pages);
  }
  loadFoods(): void {
    this.foodService
      .getAllFoods(this.currentPage, this.limit)
      .subscribe((food) => {
        console.log(food);
        this.foods = food.data;
        this.totalPageCount = this.totalPageCount = Math.ceil(
          food.total / this.limit
        );
        this.pages = Array.from(
          { length: this.totalPageCount },
          (_, i) => i + 1
        );
      });
  }
  deleteFood(id: string): void {
    this.foodService.deleteFood(id).subscribe(() => {
      this.foods = this.foods.filter((food) => food._id !== id);
    });
  }
  addFood(): void {
    const food = this.foodForm.value;
    this.foodService.createFood(food).subscribe((newFood) => {
      this.foods.push(newFood);
      this.foodForm.reset();
      this.isAddPopupOpen = false;
    });
  }
  updateFood(food: any): void {
    this.foodService.updateFood(food._id, food).subscribe((updatedFood) => {
      const index = this.foods.findIndex((f) => f._id === updatedFood._id);
      this.foods[index] = updatedFood;
      this.isPopupOpen = false;
    });
  }
  setLanguage(lang: string) {
    this.selectedLanguage = lang;
  }
  togglePopup(food: any): void {
    this.selectedFood = food;
    this.isPopupOpen = !this.isPopupOpen;
  }
  toggleAddPopup(): void {
    this.isAddPopupOpen = !this.isAddPopupOpen;
    this.foodForm.reset();
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
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const file = target.files[0];
        
    }
  }
}
