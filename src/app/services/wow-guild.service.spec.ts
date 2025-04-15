import { TestBed } from '@angular/core/testing';

import { WowGuildService } from './wow-guild.service';

describe('WowGuildService', () => {
  let service: WowGuildService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WowGuildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
