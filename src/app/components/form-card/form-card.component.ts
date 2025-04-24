import { Component, input } from '@angular/core';
import { FormItem } from '../../pages/form-page/models/form-page.model';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss'],
})
export class FormCardComponent {
  data = input<FormItem | null>();
}
