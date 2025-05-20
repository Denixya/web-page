import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-change',
  templateUrl: './language-change.component.html',
  styleUrl: './language-change.component.scss',
  imports: [CommonModule],
})
export class LanguageChangeComponent {
  constructor(
    private translate: TranslateService,
    private storageService: StorageService,
  ) {
    translate.setDefaultLang('es');
  }

  get currentLanguage(): string {
    return (this.storageService.getLocalItem<string>('lang') as string) || 'es';
  }

  ngOnInit(): void {
    this.translate.use(
      this.storageService.getLocalItem<string>('lang') ||
        this.translate.getBrowserLang() ||
        this.translate.getDefaultLang(),
    );
  }

  useLanguage(language: 'es' | 'en'): void {
    this.translate.use(language);

    this.storageService.updateData<string>(language, 'local', 'lang');
  }
}
