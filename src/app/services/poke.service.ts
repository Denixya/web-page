import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PokeItem } from '../components/poke-table/models/poke-item.model';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class PokeService {
  private apiUrl = 'http://localhost:3000/api/pokedex?endpoint=pokemon';
  private readonly http = inject(HttpClient);
  private readonly storage = inject(StorageService);
  private readonly storageKey = 'pokemons';

  getPokemons(): Observable<PokeItem[]> {
    const cached = this.storage.getSessionItem<PokeItem[]>(this.storageKey);
    if (cached && cached.length) {
      return of(cached);
    }

    return this.http.get<PokeItem[]>(this.apiUrl).pipe(
      tap((data) => {
        this.storage.setSessionItem(this.storageKey, data);
      }),
    );
  }
}
