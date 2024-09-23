import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { EditAdminDialogComponent } from 'src/app/adminComponents/update-admin/update-admin.component';
import { DeleteConfirmationDialogComponent } from 'src/app/adminComponents/delete-admin/delete-admin.component';

interface Admin {
  _id: string;
  username: string;
  isSuperAdmin: boolean;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt?: string; // Add updatedAt if necessary for tracking
}

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './view-admins.component.html',
  styleUrls: ['./view-admins.component.scss']
})
export class AdminListComponent implements OnInit {
  admins: Admin[] = [];
  displayedColumns: string[] = ['username', 'isSuperAdmin', 'permissions', 'createdAt', 'actions'];

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.authService.getAllAmins({}).subscribe(
      (data: Admin[]) => {
        this.admins = data;
      },
      error => {
        console.error('Error loading admins:', error);
      }
    );
  }

  openEditDialog(admin: Admin) {
    const dialogRef = this.dialog.open(EditAdminDialogComponent, {
      width: '400px',
      data: { ...admin }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const filteredResult = this.filterAdminResult(result);
        this.authService.updateAdmin(result._id, filteredResult).subscribe(
          () => {
            this.loadAdmins(); // Refresh the list after updating
          },
          error => {
            console.error('Error updating admin:', error);
          }
        );
      }
    });
  }

  filterAdminResult(result: any) {
    const { username, isSuperAdmin, permissions, updatedAt } = result;
    return {
      username,
      isSuperAdmin,
      permissions,
      updatedAt
    };
  }


    confirmDelete(admin: Admin) {
      const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
        width: '300px',
        data: { username: admin.username }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.authService.deleteAdmin(admin._id).subscribe(
            () => {
              this.loadAdmins(); // Refresh the list after deletion
            },
            error => {
              console.error('Error deleting admin:', error);
            }
      );
    }
  })
}
}
