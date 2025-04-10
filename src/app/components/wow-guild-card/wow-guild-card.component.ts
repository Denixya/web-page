import { Component, input } from '@angular/core';
import { WowItem } from './models/wow-item.model';

@Component({
  selector: 'app-wow-guild-card',
  templateUrl: './wow-guild-card.component.html',
  styleUrls: ['./wow-guild-card.component.scss'],
})
export class WowGuildCardComponent {
  wowItems = input<WowItem[]>();
  favicon = 'favicon.ico';
}
