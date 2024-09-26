import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'src/app/services/auth.service';
import { EditAdminDialogComponent } from 'src/app/adminComponents/update-admin/update-admin.component';
import { DeleteConfirmationDialogComponent } from 'src/app/adminComponents/delete-admin/delete-admin.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MatPaginatorIntl } from '@angular/material/paginator';

// Custom paginator labels
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Admins per page';
  override nextPageLabel = 'Next page';
  override previousPageLabel = 'Previous page';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 of ${length} admin(s)`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} of ${length} admin(s)`;
  };
}

interface Admin {
  _id: string;
  username: string;
  isSuperAdmin: boolean;
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    ToastModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './view-admins.component.html',
  styleUrls: ['./view-admins.component.scss'],
  providers: [
    MessageService,
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ]
})
export class AdminListComponent implements OnInit {
  admins: Admin[] = [];
  displayedColumns: string[] = ['username', 'isSuperAdmin', 'permissions', 'isActive', 'createdAt', 'actions'];
  errorMessage: string = "";
  searchTerm: string = "";
  currentPage: number = 0;
  pageSize: number = 10;
  totalAdmins: number = 0;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.authService.getAllAmins(this.searchTerm, this.currentPage + 1, this.pageSize).subscribe(

      (response: any) => {
        console.log( this.currentPage + 1);
        this.admins = response.data;
        this.totalAdmins = response.total;
      },
      error => {
        console.error('Error loading admins:', error);
        this.messageService.add({ severity: 'error', summary: '', detail: error.error.message });
        this.errorMessage = error.error.message;
      }
    );
  }

  onSearch() {
    this.currentPage = 0;
    this.loadAdmins();
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadAdmins();
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
            this.loadAdmins();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated successfully' });
          },
          error => {
            console.error('Error updating admin:', error);
            this.messageService.add({ severity: 'error', summary: '', detail: error.error.message });
          }
        );
      }
    });
  }

  filterAdminResult(result: any) {
    const { username, isSuperAdmin, permissions, updatedAt } = result;
    return { username, isSuperAdmin, permissions, updatedAt };
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
            this.loadAdmins();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted successfully' });
          },
          error => {
            console.error('Error deleting admin:', error);
            this.messageService.add({ severity: 'error', summary: '', detail: error.error.message });
          }
        );
      }
    });
  }
}
