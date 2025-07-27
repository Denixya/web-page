import { TestBed } from '@angular/core/testing';

import { PokedexStoreService } from './pokedex-store.service';

describe('PokedexStoreService', () => {
  let service: PokedexStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedexStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
