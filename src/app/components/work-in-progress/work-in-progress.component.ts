import { Component, input } from '@angular/core';

@Component({
  selector: 'app-work-in-progress',
  imports: [],
  templateUrl: './work-in-progress.component.html',
  styleUrl: './work-in-progress.component.scss',
})
export class WorkInProgressComponent {
  elementName = input<string>();
  elementSize = input<number>();
  elementDescription = input<string>();
}
