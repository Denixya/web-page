import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderItem } from './components/header/models/header-item.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'web-page';
  headerItems: HeaderItem[] = [
    {
      label: 'Inicio',
      link: '/home'
    },
    {
      label: 'Proyectos personales',
      link: '/projects'
    },{
      label: 'Curriculum',
      link: '/cv'
    },{
      label: 'DB',
      link: '/dragonball'
    }
  ]
}
