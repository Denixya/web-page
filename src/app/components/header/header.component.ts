import { Component, input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderItem } from './models/header-item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  items = input.required<HeaderItem[]>();
}
