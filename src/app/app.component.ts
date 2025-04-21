import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderItem } from './components/header/models/header-item.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'web-page';
  headerItems: HeaderItem[] = [
    {
      label: 'Inicio',
      link: '/home',
    },
    {
      label: 'Curriculum',
      link: '/cv',
    },
    {
      label: 'Proyectos',
      links: [
        {
          label: 'Inicio Proyectos',
          link: '/projects',
        },
        {
          label: 'Proyecto WoW',
          link: '/projects/wow',
        },
        {
          label: 'Formulario',
          link: '/projects/form',
        },
      ],
    },
  ];
}
