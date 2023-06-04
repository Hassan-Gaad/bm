import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DetailsResolver implements Resolve<boolean> {
  constructor(private router: Router) {}
  resolve(): Observable<boolean> | Promise<boolean> | boolean {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      return true;
    }else return false
  }
}
