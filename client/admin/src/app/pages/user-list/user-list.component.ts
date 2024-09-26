import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { EditAdminDialogComponent } from 'src/app/adminComponents/update-admin/update-admin.component';
import { DeleteConfirmationDialogComponent } from 'src/app/adminComponents/delete-admin/delete-admin.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/services/users.service';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Users per page';
  override nextPageLabel = 'Next page';
  override previousPageLabel = 'Previous page';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 of ${length} user(s)`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} of ${length} user(s)`;
  };
}
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule,ToastModule, MatIconModule, MatPaginatorModule,MatFormFieldModule,MatInputModule,FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  providers: [
    MessageService,
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ]

})
export class UserListComponent implements OnInit  {
  users:any = [];
  displayedColumns: string[] = ['index','username', 'userEmail', 'isConfirmed', 'createdAt','actions'];
  errorMessage:string=""
  searchTerm: string = "";
  currentPage: number = 0;
  pageSize: number = 10;
  totalUsers: number = 0;

  constructor(private _usersService:UsersService, private dialog: MatDialog,private messageService: MessageService) {}
  
  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this._usersService.getAllUsers(this.searchTerm,  this.pageSize,this.currentPage + 1,).subscribe(
      (res:any) => {
        let{data,total,totalPages,page,limit}=res
        console.log(data);
        this.users = data;
        this.totalUsers = total;
      },
      error => {
        console.error('Error loading Users:', error);
        this.messageService.add({ severity: 'error', summary: '', detail: error.error.message });
        this.errorMessage=error.error.message

      }
    );
  }



  
    confirmDelete(user:any) {
      const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
        width: '300px',
        data: { username: user.username }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this._usersService.deleteUser(user._id).subscribe(
            () => {
              this.loadUsers(); // Refresh the list after deletion
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'deleted successfully ' });

            },
            error => {
              console.error('Error deleting admin:', error);
              this.messageService.add({ severity: 'error', summary: '', detail: error.error.message});
            }
      );
    }
  })
}

onSearch() {
  this.currentPage = 0;
  this.loadUsers();
}

onPageChange(event: PageEvent) {
  this.currentPage = event.pageIndex;
  this.pageSize = event.pageSize;
  this.loadUsers();
}
  
}

