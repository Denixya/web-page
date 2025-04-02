import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  imageSrc = input<string>();
  imageAlt = input<string>();
  title = input<string>();
  description = input<string>();
}
