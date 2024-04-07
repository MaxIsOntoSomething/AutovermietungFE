import { TestBed } from '@angular/core/testing';

import { StorageService } from './user.storage.service';

describe('StorageService', () => {
  /**
   * Der StorageService ist eine Service-Klasse, die Methoden zum Speichern und Abrufen von Daten im lokalen Speicher bereitstellt.
   */
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
