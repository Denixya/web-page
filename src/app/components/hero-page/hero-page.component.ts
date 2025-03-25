import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-hero-page',
  imports: [],
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.scss'
})
export class HeroPageComponent {
  // name => string  = 'Ironman'
  // age => number = 45
  name = signal('Ironman');
  age = signal(45);
  // Crear un método llamado: getHeroDescription Debe de regresar la concatenación del nombre y la edad.
  getHeroDescription(){
    return `${this.name()} - ${this.age()}`;
  }
  //Implementar el método changeHero, no recibe argumentos y lo cambia a:
  changeHero(){
    this.name.set('Spiderman');
    this.age.set(22);
  }
  //Implementar el método: resetForm, el cual establece
  resetForm(){
    this.name.set('Ironman');
    this.age.set(45);
  }
  //Implementar el método: chageAge, asignalor al evento click del botón respectivo.
  changeAge(){
    this.age.set(60);
  }
}
