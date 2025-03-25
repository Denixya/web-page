import { Component } from '@angular/core';
import { HeroPageComponent } from '../../components/hero-page/hero-page.component';

@Component({
  selector: 'app-home',
  imports: [HeroPageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
