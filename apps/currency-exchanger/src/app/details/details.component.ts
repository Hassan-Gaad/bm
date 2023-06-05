import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  CurrencyChartComponent,
  CurrencyConverterComponent,
} from '@bm/currency';
import { map } from 'rxjs';

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
  state:Record<string,any>|undefined;
  constructor( route: Router, public actRoute:ActivatedRoute) {
     this.state = route.getCurrentNavigation()?.extras.state;
  }

  set targetCurrencyChange(value:string){
    this.actRoute.params=this.actRoute.params.pipe(
      map((params)=>{
        return {...params,to:value}
      })
    )
  }
}
