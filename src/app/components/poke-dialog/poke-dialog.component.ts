import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PokeItem } from '../poke-table/models/poke-item.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'poke-dialog',
  templateUrl: 'poke-dialog.component.html',
  imports: [MatDialogTitle, MatDialogContent, TitleCasePipe, MatIconModule],
  styleUrl: './poke-dialog.component.scss',
})
export class PokeDialog {
  data: PokeItem = inject(MAT_DIALOG_DATA);

  dialogRef = inject(MatDialogRef<PokeDialog>);
  closeDialog() {
    this.dialogRef.close();
  }
}
