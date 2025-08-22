import { Component, inject } from '@angular/core';
import { PokeService } from '../../services/poke.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { PokeTableComponent } from '../../components/poke-table/poke-table.component';

@Component({
  selector: 'app-project-pokedex',
  imports: [PokeTableComponent],
  templateUrl: './project-pokedex.component.html',
  styleUrl: './project-pokedex.component.scss',
})
export class ProjectPokedexComponent {
  private readonly pokeService = inject(PokeService);

  pokemonList = toSignal(
    this.pokeService.getPokemons().pipe(
      catchError((error) => {
        console.error('Error fetching pokedex:', error);
        return of([]);
      }),
    ),
    {
      initialValue: [],
    },
  );
}
