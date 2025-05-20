import { Component, input, output } from '@angular/core';
import { FormItem } from '../../pages/form-page/models/form-page.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-form-card',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './form-card.component.html',
  styleUrl: './form-card.component.scss',
})
export class FormCardComponent {
  readonly data = input<FormItem>();
  readonly delete = output<string>();

  onDelete(): void {
    this.delete.emit(this.data()!.email);
  }
}
