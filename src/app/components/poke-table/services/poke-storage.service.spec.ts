import { TestBed } from '@angular/core/testing';

import { PokeStorageService } from './poke-storage.service';

describe('PokeStorageService', () => {
  let service: PokeStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
