import { Component, input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderItem } from './models/header-item.model';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageChangeComponent } from '../language-change/language-change.component';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    CommonModule,
    TranslateModule,
    RouterModule,
    LanguageChangeComponent,
  ],
  providers: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  items = input.required<HeaderItem[]>();
}
