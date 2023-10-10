import { TestBed } from '@angular/core/testing';

import { YtServiceService } from './yt-service.service';

describe('YtServiceService', () => {
  let service: YtServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YtServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
