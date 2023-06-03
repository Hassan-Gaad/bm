import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QueryModel } from '../interfaces/currency-convert.model';
import { APP_ENVIRONMENT } from '@bm/core';
import { LatestModel } from '../interfaces/currency-latest.model';
@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENVIRONMENT) private environemnt: any
  ) {}
  convertCurrency(query: QueryModel): Observable<LatestModel> {
    // const url = `${this.environemnt.baseUrl}convert`;
    // const params = new HttpParams()
    //   .set('from', query.from)
    //   .set('to', query.to)
    //   .set('amount', query.amount);
    /**
     * instead of creating multiple api call
     * we gonna get lates of every pupular currency
     */
    const url = `${this.environemnt.baseUrl}latest`;
    const params = new HttpParams()
      .set('base', query.from)
      .set('symbols', query.to)
    return this.http.get<LatestModel>(url, { params });
  }
}
