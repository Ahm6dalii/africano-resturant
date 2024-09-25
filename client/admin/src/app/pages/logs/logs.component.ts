import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Logs per page';
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
interface Log {
  _id: string;
  action: string;
  admin: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-logs',
  standalone:true,
  imports: [CommonModule, MatTableModule,ToastModule, MatPaginatorModule,MatFormFieldModule,MatInputModule,FormsModule],
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  providers: [
    MessageService,
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ]
})
export class LogsComponent implements OnInit {
  logs: Log[] = [];
  errorMessage: string | null = null;
  searchTerm: string = "";
  currentPage: number = 0;
  pageSize: number = 10;
  totalLogs: number = 0;
  displayedColumns: string[] = ['username', 'action', 'createdAt'];

  constructor(private authService: AuthService,private messageService: MessageService) {}

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs(): void {
    this.authService.getAllLogs(this.searchTerm, this.currentPage + 1, this.pageSize).pipe(
      catchError((error) => {
        this.errorMessage = error.error.message;
        this.messageService.add({ severity: 'error', summary: '', detail: error.error.message });

        return [];
      })
    ).subscribe((data: any) => {
      this.logs = data.data;
      this.totalLogs = data.total;
    });
  }
  onSearch() {
    this.currentPage = 0;
    this.getLogs();
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getLogs();
  }
}
