import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderItem } from './models/header-item.model';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  items = input.required<HeaderItem[]>();
}
