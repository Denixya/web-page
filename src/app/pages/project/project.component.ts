import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-project',
  imports: [CardComponent, TranslatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {}
