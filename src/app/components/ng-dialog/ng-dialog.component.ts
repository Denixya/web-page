import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-ng-dialog-button',
  imports: [],
  templateUrl: './ng-dialog-button.component.html',
  styleUrl: './ng-dialog.component.scss',
})
export class NgDialogButtonComponent {
  dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(DataDialog, {
      data: {
        animal: 'panda',
      },
    });
  }
}

@Component({
  selector: 'ng-dialog.component',
  templateUrl: 'ng-dialog.component.html',
  imports: [MatDialogTitle, MatDialogContent],
})
export class DataDialog {
  data = inject(MAT_DIALOG_DATA);
}
