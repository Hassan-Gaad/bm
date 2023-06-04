import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QueryModel } from '../interfaces/currency-convert.model';
import { APP_ENVIRONMENT } from '@bm/core';
import { HistoryModel, LatestModel } from '../interfaces/currency-latest.model';
import { symbols } from '../const/symbols-list';
@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(
    private http: HttpClient,
    @Inject(APP_ENVIRONMENT) private environemnt: any
  ) {}
  convertCurrency(query: QueryModel): Observable<LatestModel> {
    const url = `${this.environemnt.baseUrl}latest`;
    const params = new HttpParams()
      .set('base', query.from)
      .set('symbols', query.to);
    return this.http.get<LatestModel>(url, { params });
  }

  getCurrencyHistory(date: string, base: string, target: string):Observable<HistoryModel> {
    const url = `${this.environemnt.baseUrl}/${date}`;
    const params = new HttpParams().set('base', base).set('symbols', target);
    return this.http.get<HistoryModel>(url, { params });
  }
}
