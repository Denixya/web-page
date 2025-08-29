import { Component, inject, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { PokeItem } from './models/poke-item.model';
import { TitleCasePipe } from '@angular/common';
import { PokeDialog } from '../poke-dialog/poke-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-poke-table',
  imports: [MatTableModule, TitleCasePipe],
  templateUrl: './poke-table.component.html',
  styleUrl: './poke-table.component.scss',
})
export class PokeTableComponent {
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'sprite', 'name'];
  dataSource = input<PokeItem[]>([]);

  openDialog(pokemon: PokeItem) {
    this.dialog.open(PokeDialog, {
      width: '500px',
      data: pokemon,
    });
  }
}
