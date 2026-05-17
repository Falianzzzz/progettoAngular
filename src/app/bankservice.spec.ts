import { TestBed } from '@angular/core/testing';

import { Bankservice } from './bankservice';

describe('Bankservice', () => {
  let service: Bankservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bankservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
