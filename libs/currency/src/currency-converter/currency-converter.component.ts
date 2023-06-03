import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { symbols } from '../const/symbols-list';
import { DomSanitizer } from '@angular/platform-browser';
import { CurrencyService } from '../services/currency.service';
import { Subscription, tap, noop } from 'rxjs';
import { ExchangeUiModel } from '../interfaces/currency-latest.model';
import { NumbersOnlyFormControl } from '@bm/core';

@Component({
  selector: 'bm-currency-converter',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  @Input() baseCurrency!: string;
  @Input() targetCurrency!: string;
  @Output() response = new EventEmitter<ExchangeUiModel[]>();
  symbols = symbols;
  subs!: Subscription;
  rate!: string;
  result!: string;
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private currencyService: CurrencyService
  ) {
    iconRegistry.addSvgIcon(
      'swap_horiz',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/images/swap_horiz.svg')
    );
    this.form = new FormGroup({
      from: new FormControl({
        value: this.baseCurrency || 'EUR',
        disabled: !!this.baseCurrency,
      }),
      to: new FormControl(this.targetCurrency || 'USD'),
      amount: new NumbersOnlyFormControl(1, Validators.required),
    });
  }
  ngOnInit(): void {
    this.subs = this.form.controls['amount'].valueChanges.subscribe((value) => {
      if (!value) {
        this.form.get('from')?.disable();
        this.form.get('to')?.disable();
      } else {
        this.form.get('from')?.enable();
        this.form.get('to')?.enable();
      }
    });
    this.subs = this.form.controls['from'].valueChanges.subscribe((value) => {
      this.rate = '';
      this.result = '';
    });
    this.subs = this.form.controls['to'].valueChanges.subscribe(() => {
      this.rate = '';
      this.result = '';
    });
  }

  convertCurrency() {
    if (this.form.valid) {
      this.subs = this.currencyService
        .convertCurrency(this.form.value)
        .pipe(
          tap((value) => {
            this.rate = parseFloat(value.rates[this.form.value.to]).toFixed(2);
            this.result = (
              this.form.value.amount *
              parseFloat(value.rates[this.form.value.to])
            ).toFixed(2);

            const popularCurrData: ExchangeUiModel[] = [];
            Object.entries(value.rates).forEach((rate) => {
              popularCurrData.push({
                base: value.base,
                target: rate[0],
                amount: this.form.value.amount,
                result: (
                  this.form.value.amount * parseFloat(JSON.stringify(rate[1]))
                ).toFixed(2),
              });
            });
            this.response.emit(popularCurrData);
          })
        )
        .subscribe(noop);
    }
  }
  swapCurrencies() {
    const baseCurrency = this.form.get('from')?.value;
    const targetCurrency = this.form.get('to')?.value;

    this.form.get('from')?.setValue(targetCurrency);
    this.form.get('to')?.setValue(baseCurrency);
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
