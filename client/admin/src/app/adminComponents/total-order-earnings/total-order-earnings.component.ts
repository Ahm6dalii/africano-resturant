import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import {
  NgApexchartsModule,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexAxisChartSeries,
  ApexStroke,
  ApexXAxis,
  ApexYAxis,
  ApexTheme,
  ApexMarkers,
  ApexLegend,
  ApexTitleSubtitle,
  ApexGrid,
  ApexTooltip
} from 'ng-apexcharts';
import { CommonModule } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-total-order-earnings',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './total-order-earnings.component.html',
  styleUrl: './total-order-earnings.component.scss'
})
export class TotalOrderEarningsComponent implements OnInit {
  @ViewChild('chart') chart;
  chartOptions!: any;
  amount: number = 961;
  btnActive!: string;
  totalEarningWeekly: any
  totalEarningMonthly: any
  totalEarningYearly: any


  constructor(private _orderService: OrdersService) { }
  ngOnInit(): void {
    this.getEarningWeekly()
    this.getMonthlyEarnings()
    this.getYearlyEarnings()
    this.btnActive = 'year';
    this.chartOptions = {
      series: [{
        name: "Earnings",
        data: [35, 44, 9, 54, 45, 66, 41, 69]
      }],
      chart: {
        height: 90,
        type: "line",
        sparkline: {
          enabled: true
        }
      },
      colors: ["#ff0000"],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 3
      },
      xaxis: {
        type: 'numeric',
        lines: {
          show: false
        },
        axisBorder: {
          show: false
        },
        labels: {
          show: false
        }
      },
      yaxis: {
        min: 0,
        max: 100,
        show: false
      },
      grid: {
        show: false,
      },
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        marker: {
          show: false
        }
      }
    };

  }


  getEarningWeekly() {
    this._orderService.getWeeklyEarnings().subscribe({
      next: (res) => {
        this.totalEarningWeekly = res.totalEarnings
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getMonthlyEarnings() {
    this._orderService.getMonthlyEarnings().subscribe({
      next: (res) => {
        console.log(res);
        this.totalEarningMonthly = res.totalEarnings
      },
      error: (err) => {
        console.error(err);

      }
    });
  }

  getYearlyEarnings() {
    this._orderService.getYearlyEarnings().subscribe({
      next: (res) => {
        console.log(res);
        this.totalEarningYearly = res.totalEarnings
      },
      error: (err) => {
        console.error(err);

      }
    });
  }


  toggleActive(value: string) {
    this.btnActive = value;
    if (value === 'month') {
      this.chartOptions.series = [{
        name: "Earnings",
        data: [45, 66, 41, 89, 25, 44, 9, 54]
      }];
      this.amount = 108;
    } else {
      this.chartOptions.series = [{
        name: "Earnings",
        data: [35, 44, 9, 54, 45, 66, 41, 69]
      }];
      this.amount = 961;
    }
  }

}
