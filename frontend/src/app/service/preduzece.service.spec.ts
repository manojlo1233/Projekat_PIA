import { TestBed } from '@angular/core/testing';

import { PreduzeceService } from './preduzece.service';

describe('PreduzeceService', () => {
  let service: PreduzeceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreduzeceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
