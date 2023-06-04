import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { CurrencyService } from '../services/currency.service';
import { Observable, forkJoin, map, tap } from 'rxjs';

@Component({
  selector: 'bm-currency-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './currency-chart.component.html',
  styleUrls: ['./currency-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyChartComponent implements OnInit {
  @Input() base='EUR';
  @Input() target='USD';
  rates$!: Observable<number[]>;

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.months,
    datasets: [
      {
        data: [],
        label:this.base,
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: '#164E63',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  constructor(private currency: CurrencyService) {}
  ngOnInit(): void {
    const datesList = this.months.map((month, index) => {
      return this.getDateOfLastDay(2022, index+1);
    });
    const ratesHistory$ = datesList.map((date) => {
      return this.currency
        .getCurrencyHistory(date, this.base, this.target)
        .pipe(
          map((currencyHistory) => {
            return parseFloat(currencyHistory.rates[this.target]);
          })
        );
    });
    this.rates$ = forkJoin(ratesHistory$).pipe(
      tap((rates) => {
        this.lineChartData.datasets[0].data = rates;
      })
    );

    this.lineChartData.datasets[0].label=this.base;
  }
  getDateOfLastDay(year: number, month: number) {
    return new Date(new Date(year, month, 1).valueOf() - 1)
      .toISOString()
      .split('T')[0];
  }
}
