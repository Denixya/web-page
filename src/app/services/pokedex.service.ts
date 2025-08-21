import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonItem } from '../components/poke-table/models/pokemon-item.model';

@Injectable({ providedIn: 'root' })
export class PokedexService {
  private apiUrl = 'http://localhost:3000/api/pokedex?endpoint=pokemon';
  private readonly http = inject(HttpClient);

  getPokemons(): Observable<PokemonItem[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
