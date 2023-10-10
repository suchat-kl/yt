import { TestBed } from '@angular/core/testing';

import { EffDateService } from './eff-date.service';

describe('EffDateService', () => {
  let service: EffDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EffDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
