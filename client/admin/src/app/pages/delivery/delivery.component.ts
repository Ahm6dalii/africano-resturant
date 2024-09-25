import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeliveryService } from 'src/app/services/delivery.service';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent implements OnInit {

  deliveyPrice:number=0;
  errorMessage: string = "";
  isLoading: boolean = false;
  constructor(private _deliveryService:DeliveryService) { }

  changeDeliveryForm: FormGroup = new FormGroup({
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
 
  })
  ngOnInit(): void {
   
    this.getDeliveryPrice()
  }
  getDeliveryPrice(){
    this._deliveryService.getDeliveryPrice().subscribe({
      next:(res)=>{
        this.deliveyPrice=res.price
      },
      error:(err)=>{
        console.log(err); 
      },
    })
  }
  changeDelivery() {
    const price = {
      price: this.changeDeliveryForm.get('price')?.value
    };
    if (this.changeDeliveryForm.valid == false) {
      this.changeDeliveryForm.markAllAsTouched()
    }
    else {
      this.errorMessage = ""
      this.isLoading = true
      console.log(this.changeDeliveryForm.value);
      
      this._deliveryService.updateDeliveryPrice(price).subscribe({
        next: (res: any) => {   
          console.log(res,'resresres');
            
          this.changeDeliveryForm.reset();
          this.isLoading = false
          this.getDeliveryPrice()
        },
        error: (err: any) => {
          console.log(err);
          this.errorMessage = err.error.message
          this.isLoading = false
        },
      })
    }

  }
}
