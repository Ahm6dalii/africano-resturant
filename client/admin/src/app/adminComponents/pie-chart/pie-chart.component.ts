import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { OrdersService } from 'src/app/services/orders.service';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [ChartModule, CommonModule, MatCardModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit {
  data: any;
  options: any;
  activePeriod: string = 'weekly';
  totalPaymentMethodCounts: any; // To hold payment method counts based on active period

  constructor(private _orderService: OrdersService) { }

  ngOnInit() {
    this.fetchPaymentMethodCounts(); // Fetch initial data
    this.initializeChartOptions(); // Initialize chart options
  }

  // Function to initialize chart options
  initializeChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }

  // Function to set the active period and fetch corresponding data
  setActivePeriod(period: string) {
    this.activePeriod = period;
    this.fetchPaymentMethodCounts();
  }

  // Function to fetch payment method counts based on the active period
  fetchPaymentMethodCounts() {
    let fetchCounts;

    if (this.activePeriod === 'weekly') {
      fetchCounts = this._orderService.getWeeklyPaymentMethodCounts();
    } else if (this.activePeriod === 'monthly') {
      fetchCounts = this._orderService.getMonthlyPaymentMethodCounts();
    } else if (this.activePeriod === 'yearly') {
      fetchCounts = this._orderService.getYearlyPaymentMethodCounts();
    }

    if (fetchCounts) {
      fetchCounts.subscribe({
        next: (res) => {
          this.totalPaymentMethodCounts = res;
          this.updateChartData(); // Update chart data after fetching counts
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  // Function to update chart data based on fetched counts
  updateChartData() {
    this.data = {
      labels: this.totalPaymentMethodCounts.map(item => item._id), // Payment method names
      datasets: [
        {
          data: this.totalPaymentMethodCounts.map(item => item.count), // Corresponding counts
          backgroundColor: ['#03c9d7', '#ff6384'], // Set your colors here
          hoverBackgroundColor: ['#03c9d7', '#ff6384']
        }
      ]
    };
  }

}
