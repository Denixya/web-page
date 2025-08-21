import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PokemonItem } from './models/pokemon-item.model';
import { PokeTypeItem } from './models/poketype-item.model';

/**
 * @title Pokemon Table
 */
@Component({
  selector: 'app-poke-table',
  imports: [MatTableModule],
  templateUrl: './poke-table.component.html',
  styleUrl: './poke-table.component.scss',
})
export class PokeTableComponent {
  displayedColumns: string[] = ['sprite', 'id', 'name', 'type'];
  dataSource = POKEMON_DATA;
}

const POKEMON_DATA: PokemonItem[] = [
  {
    id: 1,
    name: 'Bulbasaur',
    height: 10,
    weight: 10,
    typeId: [1],
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  {
    id: 4,
    name: 'Charmander',
    height: 10,
    weight: 10,
    typeId: [1],
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
  },
  {
    id: 7,
    name: 'Squirtle',
    height: 10,
    weight: 10,
    typeId: [1],
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
  },
];
