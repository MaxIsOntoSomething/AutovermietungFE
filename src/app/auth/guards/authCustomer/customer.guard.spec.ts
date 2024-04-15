import { TestBed } from '@angular/core/testing';

import { CustomerGuard } from './customer.guard';

describe('CustomerGuard', () => {
  let guard: CustomerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({}); // Überprüft, ob der Guard erstellt werden kann
    guard = TestBed.inject(CustomerGuard); // Erstellt den Guard
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
