import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SocketIoService } from 'src/app/services/socket-io.service';

@Component({
  selector: 'app-change-pass',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.scss'
})
export class ChangePassComponent implements OnInit {

  adminId: any
  constructor(private _authService: AuthService,
    private _socketIoService: SocketIoService,
  ) { }
  ngOnInit(): void {
    this.adminId = this._authService.tokenUserId.getValue();
    console.log(this.adminId, "adminId");
    this._socketIoService.setUserId(this._authService.tokenUserInfo.getValue().userId);
    this._socketIoService.startListening();
    this._socketIoService.emit('register', { adminId: this.adminId, userId: null });
  }
  router = inject(Router)
  errorMessage: string = "";
  isLoading: boolean = false;

  changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required,
    Validators.minLength(6),
      , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)  // At least one letter, one number, minimum 6 characters

    ]),
    rePassword: new FormControl(null, [Validators.required
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
