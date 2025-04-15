import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  imageSrc = input<string>();
  imageAlt = input<string>();
  title = input<string>();
  description = input<string>();
  link = input<string>();
}
