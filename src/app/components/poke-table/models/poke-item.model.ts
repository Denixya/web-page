export interface PokeItem {
  id: number;
  name: string;
  height: number;
  weight: number;
  type: PokeType[];
}

export interface PokeType {
  name: string;
  id: number;
}
