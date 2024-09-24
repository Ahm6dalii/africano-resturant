import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,ToastModule, MatInputModule, FormsModule, ReactiveFormsModule, CommonModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  constructor(private _authService: AuthService ,private messageService: MessageService) { }
  router = inject(Router)
  errorMessage: string = "";
  isLoading: boolean = false;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    password: new FormControl(null, [Validators.required,
    Validators.minLength(6),
      , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)  // At least one letter, one number, minimum 6 characters

    ]),
  })
  login() {

    if (this.loginForm.valid == false) {
      this.loginForm.markAllAsTouched()
    }
    else {
      this.errorMessage = ""
      this.isLoading = true
      this._authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          // localStorage.setItem('token', res.token)
          this._authService.saveUserToken(res.token)
          this.loginForm.reset();
          this.isLoading = false
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'signed in successfully ' });
          this.router.navigate(["/home"])
          this.loginForm.markAsUntouched()

          // this._hasToken.hasToken.next(true);
        },
        error: (err: any) => {
          console.log(err);
          this.errorMessage = err.error.message
          this.messageService.add({ severity: 'error', summary: '', detail: 'invalid email or password' });
          this.loginForm.markAsUntouched()
          this.isLoading = false
        },
      })
    }

  }
}
