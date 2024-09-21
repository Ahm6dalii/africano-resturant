import { Component, Input } from '@angular/core';


import { TableModule } from 'primeng/table';

import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';

import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-order-table',
  standalone: true,
  imports: [TableModule, TagModule, ToastModule, RatingModule,
    ButtonModule, CommonModule, DropdownModule, FormsModule,
    DemoFlexyModule, MatTabsModule, NgFor, NgIf, AsyncPipe],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.scss'
})
export class OrderTableComponent {
  @Input() orders: any[] = [];
  @Input() expandedRows: { [key: string]: 'user' | 'order' | null } = {};
  @Input() statusOptions: any[] = [];
  @Input() updateOrderStatus?: (orderId: string, newStatus: string) => void;
  @Input() toggleRowExpansion?: (orderId: string, type: 'user' | 'order') => void;
}
