import { Component, OnInit } from '@angular/core';
import { TotalsService } from './../../services/totals.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-total-counts',
  standalone: true,
  imports: [MatIconModule, MatCardModule],
  templateUrl: './total-counts.component.html',
  styleUrl: './total-counts.component.scss'
})
export class TotalCountsComponent implements OnInit {
  totalMenu: any;
  totalCategories: any;
  totalOrders: any;
  totalAdmins: any;
  totalUsers: any;
  constructor(private _totalsService: TotalsService) { }

  ngOnInit(): void {
    this.getOrders()
    this.getFoods()
    this.getCategories()
    this.getUsers()
    this.getAllAmins()
  }

  getOrders() {
    this._totalsService.getOrders().subscribe({
      next: (res: any) => {
        console.log(res, "res");
        this.totalOrders = res.total
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  getFoods() {
    this._totalsService.getFoods().subscribe({
      next: (res: any) => {
        console.log(res, "res");
        this.totalMenu = res.total
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  getCategories() {
    this._totalsService.getCategories().subscribe({
      next: (res: any) => {
        console.log(res, "res");
        this.totalCategories = res.length
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  getUsers() {
    this._totalsService.getUsers().subscribe({
      next: (res: any) => {
        console.log(res, "res");
        this.totalUsers = res.total
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  getAllAmins() {
    this._totalsService.getAllAmins().subscribe({
      next: (res: any) => {
        console.log(res, "res");
        this.totalAdmins = res.total
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
