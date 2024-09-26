import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexStroke,
  ApexTooltip,
  ApexAxisChartSeries,
  ApexFill,
  ApexXAxis,
  ApexGrid
} from 'ng-apexcharts';
import { OrdersService } from 'src/app/services/orders.service';


export interface activeusercardChartOptions {
  series: ApexAxisChartSeries;
  dataLabels: ApexDataLabels;
  chart: ApexChart;
  legend: ApexLegend;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
}


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],

})
export class SalesComponent implements OnInit {
  totalSoldItemsWeekly: any;
  totalSoldItemsMonthly: any;
  totalSoldItemsYearly: any;
  activePeriod: string = 'weekly';
  @ViewChild("activeusercardchart") chart1: ChartComponent = Object.create(null);
  public activeusercardChartOptions!: Partial<activeusercardChartOptions> | any;

  constructor(private _orderService: OrdersService) { }

  ngOnInit() {
    this.getTopSoldItemsWeekly();
    this.getTopSoldItemsMonthly();
    this.getTopSoldItemsYearly();
  }

  getTopSoldItemsWeekly() {
    this._orderService.getTopSoldItemsWeekly().subscribe({
      next: (res) => {
        this.totalSoldItemsWeekly = res;
        this.updateChart('weekly', res);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getTopSoldItemsMonthly() {
    this._orderService.getTopSoldItemsMonthly().subscribe({
      next: (res) => {
        console.log(res);
        this.totalSoldItemsMonthly = res;
        this.updateChart('monthly', res);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  getTopSoldItemsYearly() {
    this._orderService.getTopSoldItemsYearly().subscribe({
      next: (res) => {
        console.log(res);
        this.totalSoldItemsYearly = res;
        this.updateChart('yearly', res);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // Update chart data dynamically based on the time period (weekly, monthly, yearly)
  updateChart(period: string, data: any) {
    console.log(data, "data");

    const soldItemsData = data?.totalEarnings?.map((item: any) => item.totalSold);
    const soldItemsNames = data?.totalEarnings?.map((item: any) => item._id);

    this.activeusercardChartOptions = {
      series: [
        {
          name: 'Items Sold',
          data: soldItemsData,
          color: this.activePeriod === 'weekly' ? "#03c9d7" : this.activePeriod === 'monthly' ? "#fb9678" : "#e46a76",
        }
      ],
      xaxis: {
        categories: soldItemsNames,
      },
      chart: {
        toolbar: {
          show: false,
        },
        type: 'bar',
        height: 500,
      },
      legend: {
        show: false,
      },
      tooltip: {
        theme: "dark"
      },
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 5,
        colors: ['none']
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          borderRadius: 8,
        },
      },
    };
  }
  changePeriod(period: string) {
    this.activePeriod = period;
    if (period === 'weekly') {
      this.getTopSoldItemsWeekly();
    } else if (period === 'monthly') {
      this.getTopSoldItemsMonthly();
    } else if (period === 'yearly') {
      this.getTopSoldItemsYearly();
    }
  }
}
