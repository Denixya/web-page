import { Component, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { PokedexService } from '../../services/pokedex-store.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { LoadingMessageComponent } from '../../components/loading-message/loading-message.component';

@Component({
  selector: 'app-project-pokedex',
  imports: [CardComponent, LoadingMessageComponent],
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
