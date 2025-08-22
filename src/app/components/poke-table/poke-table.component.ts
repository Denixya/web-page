import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PokeItem } from './models/poke-item.model';
import { TitleCasePipe } from '@angular/common';

/**
 * @title Pokemon Table
 */
@Component({
  selector: 'app-poke-table',
  imports: [MatTableModule, TitleCasePipe],
  templateUrl: './poke-table.component.html',
  styleUrl: './poke-table.component.scss',
})
export class PokeTableComponent {
  displayedColumns: string[] = ['id', 'sprite', 'name', 'type'];
  dataSource = input<PokeItem[]>([]);
}
//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png
