import { TestBed } from '@angular/core/testing';

import { ErrorFirebaseService } from './error-firebase.service';

describe('ErrorFirebaseService', () => {
  let service: ErrorFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
