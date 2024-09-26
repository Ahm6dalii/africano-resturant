import { Component, Inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './order-delete-dialog.component.html',
  styleUrl: './order-delete-dialog.component.scss'
})
export class OrderDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<OrderDeleteDialogComponent>,

  ) { }
}
