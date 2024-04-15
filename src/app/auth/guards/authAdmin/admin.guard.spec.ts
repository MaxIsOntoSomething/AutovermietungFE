import { TestBed } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({}); // Überprüft, ob der Guard erstellt werden kann
    guard = TestBed.inject(AdminGuard); // Erstellt den Guard
  });

  it('should be created', () => { // Überprüft, ob der Guard erstellt wurde
    expect(guard).toBeTruthy(); // Erwartet, dass der Guard erstellt wurde
  }); 
});


