import { TestBed } from '@angular/core/testing';

import { CustomLibService } from './custom-lib.service';

describe('CustomLibService', () => {
  let service: CustomLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
