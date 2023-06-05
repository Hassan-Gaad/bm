import { Component } from '@angular/core';
import { ExchangeUiModel } from '@bm/currency';

@Component({
  selector: 'bm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private _currExchangeRates!: ExchangeUiModel[];
  get currExchangeRates(): ExchangeUiModel[] {
    return this._currExchangeRates;
  }
  set currExchangeRates(value:ExchangeUiModel[]){
    this._currExchangeRates=value;
  }
}
