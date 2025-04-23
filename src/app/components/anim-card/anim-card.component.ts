import {
  Component,
  OnChanges,
  SimpleChanges,
  input,
  signal,
  computed,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-anim-card',
  templateUrl: './anim-card.component.html',
  styleUrls: ['./anim-card.component.scss'],
  standalone: true,
})
export class AnimCardComponent implements OnChanges {
  videoSrc = input<string>();
  title = input<string>();

  private _safeVideoSrc = signal<SafeResourceUrl | null>(null);
  safeVideoSrc = computed(() => this._safeVideoSrc());

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['videoSrc']) {
      const url = changes['videoSrc'].currentValue;
      this._safeVideoSrc.set(
        this.sanitizer.bypassSecurityTrustResourceUrl(url),
      );
    }
  }
}
