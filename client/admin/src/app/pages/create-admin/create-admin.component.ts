import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from 'src/app/services/auth.service';
import { SocketIoService } from 'src/app/services/socket-io.service';

@Component({
  selector: 'app-create-admin',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ToastModule, ReactiveFormsModule, CommonModule, MatCheckboxModule, MatRadioModule],
  templateUrl: './create-admin.component.html',
  styleUrl: './create-admin.component.scss',
  providers: [MessageService]
})
export class CreateAdminComponent implements OnInit {
  adminId: any
  constructor(private _authService: AuthService, private fb: FormBuilder, private messageService: MessageService,
    private _socketIoService: SocketIoService) { }

  router = inject(Router);
  errorMessage: string = "";
  isLoading: boolean = false;
  ngOnInit(): void {
    this.adminId = this._authService.tokenUserId.getValue();

    this._socketIoService.setUserId(this._authService.tokenUserInfo.getValue().userId);
    this._socketIoService.startListening();
    this._socketIoService.emit('register', { adminId: this.adminId, userId: null });
  }
  CreateForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]],
    permissions: this.fb.group({
      createAdmin: [false],
      updateAdmin: [false],
      viewAdmin: [false],
      deleteAdmin: [false],
      createFood: [false],
      updateFood: [false],
      deleteFood: [false],

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


    this._authService.createAdmin(requestBody).subscribe({
      next: (res: any) => {

        this.CreateForm.reset();
        this.isLoading = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'created successfully ' });
        this.CreateForm.markAsUntouched();
        // this.router.navigate(["/home"]);
      },
      error: (err: any) => {

        this.errorMessage = err.error.message;
        this.messageService.add({ severity: 'error', summary: '', detail: err.error.message });
        this.isLoading = false;
        this.CreateForm.markAsUntouched();
      },
    });
  }
}
