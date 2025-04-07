import { Component } from '@angular/core';
import { WorkInProgressComponent } from '../../components/work-in-progress/work-in-progress.component';

@Component({
  selector: 'app-project',
  imports: [WorkInProgressComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {}
