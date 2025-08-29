import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ElementRef, ViewChildren, QueryList } from '@angular/core';

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
  animation = input<boolean>(false);

  @ViewChildren('cardTrack') cardTracks!: QueryList<ElementRef<HTMLDivElement>>;

  ngAfterViewInit(): void {
    window.addEventListener('scroll', this.handleScroll);
    this.handleScroll(); // Para aplicar al cargar si ya están en pantalla
  }

  handleScroll = () => {
    const viewportHeight = window.innerHeight;
    const triggerPoint = viewportHeight * (8.5 / 10); // pinto en el que acaba la animación
    const maxOffset = 50;
    const animStart = viewportHeight; // empieza a moverse al entrar al viewport (parte inferior)

    this.cardTracks.forEach((imgRef: ElementRef<HTMLDivElement>) => {
      const img = imgRef.nativeElement;
      const rect = img.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;

      if (centerY > triggerPoint && centerY <= animStart) {
        // Rango entre triggerPoint y la parte baja del viewport
        const distance = animStart - centerY;
        const factor = distance / (animStart - triggerPoint); // 0 → 1
        const translateY = maxOffset * (1 - factor); // 40 → 0
        img.style.transform = `translateY(${translateY}px)`;
      } else if (centerY <= triggerPoint) {
        // Ya pasó el punto clave: se queda en su sitio
        img.style.transform = 'translateY(0)';
      } else {
        // Aún no entró al área animable (está muy abajo): queda abajo del todo
        img.style.transform = `translateY(${maxOffset}px)`;
      }
    });
  };
}
