import { Component } from '@angular/core';
import { AnimCardComponent } from '../../components/anim-card/anim-card.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-project-anim',
  imports: [AnimCardComponent, TranslatePipe],
  templateUrl: './project-anim.component.html',
  styleUrl: './project-anim.component.scss',
})
export class ProjectAnimComponent {}
