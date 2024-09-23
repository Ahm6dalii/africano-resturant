import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-food-crud',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
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
  constructor(private fb: FormBuilder, private foodService: FoodService) {
    this.foodForm = this.fb.group({
      name: [''],
      category: [''],
      description: [''],
      image: [''],
    });
  }
  ngOnInit(): void {
    this.foodService.getAllFoods().subscribe((food) => {
      console.log(food);
      this.foods = food.data;
    });
  }
  deleteFood(id: string): void {
    this.foodService.deleteFood(id).subscribe(() => {
      this.foods = this.foods.filter((food) => food._id !== id);
    });
  }
  // addFood(food: any): void {
  //   this.foodService.createFood(food).subscribe((newFood) => {
  //     this.foods.push(newFood);
  //     // console.log(newFood)
  //   });
  // }

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
}
