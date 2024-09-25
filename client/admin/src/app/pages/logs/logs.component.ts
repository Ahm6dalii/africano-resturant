import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

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
  imports: [CommonModule, MatTableModule,ToastModule, ],
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  providers: [MessageService]
})
export class LogsComponent implements OnInit {
  logs: Log[] = [];
  errorMessage: string | null = null;
  displayedColumns: string[] = ['username', 'action', 'createdAt'];

  constructor(private authService: AuthService,private messageService: MessageService) {}

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs(): void {
    this.authService.getAllLogs().pipe(
      catchError((error) => {
        this.errorMessage = error.error.message;
        this.messageService.add({ severity: 'error', summary: '', detail: error.error.message });

        return [];
      })
    ).subscribe((data: Log[]) => {
      this.logs = data;
    });
  }
}
