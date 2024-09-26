

import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { OrdersService } from 'src/app/services/orders.service';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketIoService } from 'src/app/services/socket-io.service';

import html2canvas from 'html2canvas';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrderDeleteDialogComponent } from 'src/app/adminComponents/order-delete-dialog/order-delete-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [TableModule, TagModule, ToastModule, RatingModule,
    ButtonModule, CommonModule, DropdownModule, FormsModule, DemoFlexyModule, MatTabsModule, NgFor, NgIf, AsyncPipe, MatDialogModule, MatIconModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  providers: [MessageService]
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: any = []
  currentStatus: string = 'preparing';
  searchTerm = '';
  selectedOrders: any[] = [];
  statusOptions = [
    { label: 'Preparing', value: 'preparing' },
    { label: 'On the Way', value: 'on_the_way' },
    { label: 'Delivered', value: 'delivered' }
  ];
  expandedRows: { [key: string]: 'user' | 'order' | null } = {};

  constructor(
    private _orderService: OrdersService,
    private _socketIoService: SocketIoService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private dialog: MatDialog,
  ) {
    console.log(this.searchTerm, "search");

  }

  ngOnInit() {

    this.getOrders(this.currentStatus);

    this._socketIoService.on('newOrder', (newOrder) => {
      console.log(`Received newOrder: ${newOrder[0]}`);
      this.orders.push(newOrder[0])
    })
  }

  getOrders(status: string) {
    this._orderService.getOrdersByStatus(status).subscribe({
      next: (res) => {
        console.log(status, "status");
        this.orders = res;
        console.log(res);
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to fetch orders' });
      }
    });
  }


  updateOrderStatus(orderId: string, newStatus: string) {
    this._orderService.updateOrderStatus(orderId, { status: newStatus }).subscribe({
      next: (updatedOrder) => {
        console.log('Order updated:', updatedOrder);

        this.orders = this.orders.filter((order: any) => order._id !== orderId);

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order status updated' });
      },
      error: (err) => {
        console.error(
          err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update order status' });
      }
    });
  }

  confirmDelete(orderId: string) {
    const dialogRef = this.dialog.open(OrderDeleteDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this._orderService.deleteOrder(orderId).subscribe({
          next: (deletedOrder) => {
            console.log('Order deletedOrder:', deletedOrder);
            this.orders = this.orders.filter((order: any) => order._id !== orderId);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order Deleted' });
          },
          error: (err) => {
            console.error(
              err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Deleted order status' });
          }
        });
      }
    })
  }
  confirmDeleteSelected() {
    if (this.selectedOrders.length === 0) {
      return;
    }
    const dialogRef = this.dialog.open(OrderDeleteDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.selectedOrders.forEach(order => {
          this._orderService.deleteOrder(order._id).subscribe({
            next: (deletedOrder) => {
              this.orders = this.orders.filter(existingOrder => existingOrder._id !== order._id);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: `Order ${order._id} deleted` });
            },
            error: (err) => {
              console.error(
                err);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Deleted order status' });
            }
          });
        })
        this.selectedOrders = [];
      }
    })
  }



  updateSelectedOrdersStatus(status: string) {
    if (!status || this.selectedOrders.length === 0) {
      return;
    }
    this.selectedOrders.forEach(order => {
      this._orderService.updateOrderStatus(order._id, { status }).subscribe({
        next: (response) => {
          console.log(status, "status")
          const index = this.orders.findIndex(o => o._id === order._id);
          if (index !== -1) {
            this.orders[index].status = status;
          }
          this.orders = this.orders.filter((item: any) => item._id !== order._id);
          this.messageService.add({ severity: 'success', summary: 'Status Updated', detail: `Order ${order._id} status updated to ${status}` });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Failed to update status for order ${order._id}` });
        }
      });
    });


    this.selectedOrders = [];
  }

  onSelectionChange(event: any) {
    this.selectedOrders = event.value;
  }

  filterProductsByNumber() {
    if (this.searchTerm) {
      this.orders = this.orders.filter((order: any
      ) =>
        order?.billing_data?.phone_number.includes(this.searchTerm) || order?.billing_data?.first_name.includes(this.searchTerm)
      );
    } else {
      this.getOrders(this.currentStatus);
    }
  }




  toggleRowExpansion(orderId: string, type: 'user' | 'order') {
    this.expandedRows[orderId] = this.expandedRows[orderId] === type ? null : type;
  }

  onTabChange(event: any) {
    const selectedIndex = event.index;

    switch (selectedIndex) {
      case 0:
        this.currentStatus = 'preparing';
        break;
      case 1:
        this.currentStatus = 'on_the_way';
        break;
      case 2:
        this.currentStatus = 'delivered';
        break;
    }

    this.getOrders(this.currentStatus);
  }
  downloadSelectedOrdersReceipts() {
    this.selectedOrders.forEach(order => {
      this.downloadOrderAsPNG(order._id);
    });
  }
  downloadOrderAsPNG(orderId: string) {
    const element = document.getElementById(`order-${orderId}`);
    if (element) {
      html2canvas(element).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `order-${orderId}.png`;
        link.click();
      }).catch(error => {
        console.error("Error capturing the element:", error);
      });
    } else {
      console.error('Order element not found');
    }
  }

  ngOnDestroy() {
    this._socketIoService.disconnect();
  }
}
