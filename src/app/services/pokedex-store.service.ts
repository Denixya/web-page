import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonItem } from '../components/poke-table/models/pokemon-item.model';

@Injectable({ providedIn: 'root' })
export class PokedexStoreService {
  // pipe(arg0: any): Observable<unknown> | import('rxjs').Subscribable<unknown> {
  //   throw new Error('Method not implemented.');
  // }
  private apiUrl = 'http://localhost:3000/api/pokedex?endpoint=pokemon';
  private readonly http = inject(HttpClient);

  getPokemons(): Observable<PokemonItem[]> {
    return this.http.get<PokemonItem[]>(this.apiUrl);
  }

  // getGuildRoster(): Observable<WowCharacter[]> {
  //     return this.http.get<WowCharacter[]>(`${this.apiUrl}?endpoint=guild`).pipe(
  //       map((chars) =>
  //         [...chars].sort((a, b) => {
  //           if (a.name === 'Drakiria') return -1;
  //           if (b.name === 'Drakiria') return 1;
  //           if (a.name === 'Chumari') return -1;
  //           if (b.name === 'Chumari') return 1;
  //           return b.mScore - a.mScore;
  //         }),
  //       ),
  //     );
  // }
}
