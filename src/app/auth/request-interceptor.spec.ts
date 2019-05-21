import { TestBed } from '@angular/core/testing';

import { RequestInterceptor } from './request-interceptor';

describe('RequestInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestInterceptor = TestBed.get(RequestInterceptor);
    expect(service).toBeTruthy();
  });
});
