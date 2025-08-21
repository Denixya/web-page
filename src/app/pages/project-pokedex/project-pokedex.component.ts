import { Component, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { PokedexService } from '../../services/pokedex.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { LoadingMessageComponent } from '../../components/loading-message/loading-message.component';
import { PokeTableComponent } from '../../components/poke-table/poke-table.component';

@Component({
  selector: 'app-project-pokedex',
  imports: [CardComponent, LoadingMessageComponent, PokeTableComponent],
  templateUrl: './project-pokedex.component.html',
  styleUrl: './project-pokedex.component.scss',
})
export class ProjectPokedexComponent {
  private readonly pokedexService = inject(PokedexService);

  pokemonList = toSignal(
    this.pokedexService.getPokemons().pipe(
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
