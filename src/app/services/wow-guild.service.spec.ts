import { TestBed } from '@angular/core/testing';
import { WowGuildService } from './wow-guild.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { WowCharacter } from '../components/wow-guild-card/models/wow-character.model';

describe('WowGuildService', () => {
  let service: WowGuildService;
  let httpMock: HttpTestingController;

  const mockCharacters: WowCharacter[] = [
    { name: 'Zandor', mScore: 1900 } as WowCharacter,
    { name: 'Drakiria', mScore: 1000 } as WowCharacter,
    { name: 'Chumari', mScore: 1800 } as WowCharacter,
    { name: 'Alther', mScore: 2100 } as WowCharacter,
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WowGuildService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(WowGuildService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the API and return characters sorted by priority', () => {
    service.getGuildRoster().subscribe((result) => {
      expect(result.length).toBe(4);
      expect(result[0].name).toBe('Drakiria');
      expect(result[1].name).toBe('Chumari');
      expect(result[2].name).toBe('Alther');
      expect(result[3].name).toBe('Zandor');
    });

    const req = httpMock.expectOne(
      'http://localhost:3000/api/wow?endpoint=guild',
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCharacters);
  });
});
