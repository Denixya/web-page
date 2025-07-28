import { Component, input } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-project-pokedex',
  imports: [CardComponent],
  templateUrl: './project-pokedex.component.html',
  styleUrl: './project-pokedex.component.scss',
})
export class ProjectPokedexComponent {
  pokemonList = input<any[] | undefined>();

  get list(): any[] {
    return this.pokemonList() ?? [];
  }

  getTypes(pokemon: any): string {
    return pokemon.types.map((t: any) => t.type.name).join(', ');
  }
}
