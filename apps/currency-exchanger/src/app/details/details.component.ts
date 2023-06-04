import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  CurrencyChartComponent,
  CurrencyConverterComponent,
} from '@bm/currency';
@Component({
  selector: 'bm-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CurrencyChartComponent,
    CurrencyConverterComponent,
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  state:Record<string,any>;
  constructor( route: Router, public actRoute:ActivatedRoute) {
     this.state = route.getCurrentNavigation()?.extras.state as Record<string, any>;
     console.log(route.getCurrentNavigation()?.extras);
  }
}
