import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { WowCharacter } from '../components/wow-guild-card/models/wow-character.model';

@Injectable({
  providedIn: 'root',
})
export class WowGuildService {
  private apiUrl = 'http://localhost:3000/api/wow';
  private readonly http = inject(HttpClient);

  getGuildRoster(): Observable<WowCharacter[]> {
    return this.http.get<WowCharacter[]>(`${this.apiUrl}?endpoint=guild`).pipe(
      map((chars) =>
        [...chars].sort((a, b) => {
          if (a.name === 'Eliora') return -1;
          if (b.name === 'Eliora') return 1;
          return b.mScore - a.mScore;
        }),
      ),
    );
  }
}
