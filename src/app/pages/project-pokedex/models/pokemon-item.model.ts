import { PokeTypeItem } from './poketype-item.model';

export interface PokemonItem {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokeTypeItem[];
  sprite: string;
}
