import { TestBed } from '@angular/core/testing';

import { Sendero } from './sendero';

describe('Sendero', () => {
  let service: Sendero;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sendero);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
