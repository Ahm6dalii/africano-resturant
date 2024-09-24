import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

interface AdminData {
  _id: string;
  username: string;
  isSuperAdmin: boolean;
  permissions: string[];
  // isActive: boolean;
}

interface EditableAdminData extends AdminData {
  createAdminPermission: boolean;
  updateAdminPermission: boolean;
  viewAdminPermission: boolean;
  deleteAdminPermission: boolean;
}

@Component({
  selector: 'app-edit-admin-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule, FormsModule],
  templateUrl: './update-admin.component.html',
  styleUrl: './update-admin.component.scss'
})
export class EditAdminDialogComponent implements OnInit {
  editableData: EditableAdminData;

  constructor(
    public dialogRef: MatDialogRef<EditAdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminData
  ) {
    this.editableData = { ...data,
      createAdminPermission: false,
      updateAdminPermission: false,
      viewAdminPermission: false,
      deleteAdminPermission: false
    };
  }

  ngOnInit() {
    this.updatePermissionCheckboxes();
  }

  updatePermissionCheckboxes() {
    this.editableData.createAdminPermission = this.editableData.permissions.includes('createAdmin');
    this.editableData.updateAdminPermission = this.editableData.permissions.includes('updateAdmin');
    this.editableData.viewAdminPermission = this.editableData.permissions.includes('viewAdmin');
    this.editableData.deleteAdminPermission = this.editableData.permissions.includes('deleteAdmin');
  }

  onSuperAdminChange() {
    if (this.editableData.isSuperAdmin) {
      this.editableData.permissions = ['super'];
    } else {
      this.editableData.permissions = [];
      this.updatePermissionsFromCheckboxes();
    }
  }

  updatePermissionsFromCheckboxes() {
    this.editableData.permissions = [];
    if (this.editableData.createAdminPermission) this.editableData.permissions.push('createAdmin');
    if (this.editableData.updateAdminPermission) this.editableData.permissions.push('updateAdmin');
    if (this.editableData.viewAdminPermission) this.editableData.permissions.push('viewAdmin');
    if (this.editableData.deleteAdminPermission) this.editableData.permissions.push('deleteAdmin');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.editableData.isSuperAdmin) {
      this.updatePermissionsFromCheckboxes();
    }
    this.dialogRef.close(this.editableData);
  }
}
