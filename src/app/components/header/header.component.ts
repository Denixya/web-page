import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderItem } from './models/header-item.model';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  items = input.required<HeaderItem[]>();
}
