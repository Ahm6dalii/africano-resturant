import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-pass',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.scss'
})
export class ChangePassComponent {


  constructor(private _authService: AuthService) { }

  router = inject(Router)
  errorMessage: string = "";
  isLoading: boolean = false;

  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required,
      Validators.minLength(6),
        , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)  // At least one letter, one number, minimum 6 characters
  
      ]),
    rePassword:new FormControl(null, [Validators.required
      , this.matchPassword.bind(this)
    ]),
  })

 matchPassword(control: FormControl) {
    const password = this.changePasswordForm?.get('password')?.value;
    return control.value === password ? null : { passwordsMismatch: true };
  }

  changePassword() {
    const passwordData = {
      password: this.changePasswordForm.get('password')?.value
    };

    if (this.changePasswordForm.valid == false) {
      this.changePasswordForm.markAllAsTouched()
    }
    else {
      this.errorMessage = ""
      this.isLoading = true
      console.log(this.changePasswordForm.value);
      
      this._authService.changePassword(passwordData).subscribe({
        next: (res: any) => {     
          this.changePasswordForm.reset();
          this.isLoading = false
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
