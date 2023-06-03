import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_ENVIRONMENT } from '../app-environment/app-environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(@Inject(APP_ENVIRONMENT) private environment: any) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const modifiedReq = request.clone({
      setParams: {
        access_key: this.environment.access_key,
      },
    });
    return next.handle(modifiedReq);
  }
}
