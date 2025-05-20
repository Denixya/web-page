import { Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderItem } from './components/header/models/header-item.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'web-page';
  headerItems!: HeaderItem[];
  readonly #translate = inject(TranslateService);
  readonly #destroyRef = inject(DestroyRef);

  constructor() {
    this.#translate.onLangChange
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => {
        this.loadHeaderItems();
      });
  }

  private loadHeaderItems(): void {
    this.headerItems = [
      { label: this.#translate.instant('navbar.home'), link: '/home' },
      { label: this.#translate.instant('navbar.cv'), link: '/cv' },
      {
        label: this.#translate.instant('navbar.projects'),
        links: [
          {
            label: this.#translate.instant('navbar.projectshome'),
            link: '/projects',
          },
          {
            label: this.#translate.instant('navbar.wow'),
            link: '/projects/wow',
          },
          {
            label: this.#translate.instant('navbar.form'),
            link: '/projects/form',
          },
          {
            label: this.#translate.instant('navbar.gallery'),
            link: '/projects/anim',
          },
        ],
      },
    ];
  }
}
