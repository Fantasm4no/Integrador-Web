import { TestBed } from '@angular/core/testing';

import { AutecticationService } from './autectication.service';

describe('AutecticationService', () => {
  let service: AutecticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutecticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
