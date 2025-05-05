import { TestBed } from '@angular/core/testing';

import { FormStorageService } from './form-storage.service';

describe('FormStorageService', () => {
  let service: FormStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
