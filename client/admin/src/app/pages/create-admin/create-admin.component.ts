import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-admin',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ToastModule,ReactiveFormsModule, CommonModule, MatCheckboxModule, MatRadioModule],
  templateUrl: './create-admin.component.html',
  styleUrl: './create-admin.component.scss',
  providers: [MessageService]
})
export class CreateAdminComponent {
  constructor(private _authService: AuthService, private fb: FormBuilder ,private messageService: MessageService) { }

  router = inject(Router);
  errorMessage: string = "";
  isLoading: boolean = false;

  CreateForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]],
    permissions: this.fb.group({
      createAdmin: [false],
      // updateAdmin: [false],
      viewAdmin: [false],
      deleteAdmin: [false]
    }),
    isSuperAdmin: [false]
  });
  get isSuperAdmin() {
    return this.CreateForm.get('isSuperAdmin')?.value;
  }
  login() {
    if (this.CreateForm.invalid) {
      this.CreateForm.markAllAsTouched();
      return;
    }

    this.errorMessage = "";
    this.isLoading = true;

    const formValue = this.CreateForm.value;
    const permissions = Object.keys(formValue.permissions).filter(key => formValue.permissions[key]);

    const requestBody = {
      username: formValue.username,
      password: formValue.password,
      permissions: permissions,
      isSuperAdmin: formValue.isSuperAdmin
    };
    console.log(requestBody);

    this._authService.createAdmin(requestBody).subscribe({
      next: (res: any) => {
        console.log(res);
        this.CreateForm.reset();
        this.isLoading = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'created successfully ' });
        this.CreateForm.markAsUntouched();
        // this.router.navigate(["/home"]);
      },
      error: (err: any) => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.messageService.add({ severity: 'error', summary: '', detail: err.error.message});
        this.isLoading = false;
        this.CreateForm.markAsUntouched();
      },
    });
  }
}
