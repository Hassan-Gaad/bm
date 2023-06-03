import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { detailsResolver } from './details.resolver';

describe('detailsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => detailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
