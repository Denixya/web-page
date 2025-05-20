import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-card',
  imports: [RouterLink, TranslatePipe],
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
