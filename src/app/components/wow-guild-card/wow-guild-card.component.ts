import { Component, input } from '@angular/core';
import { WowCharacter } from './models/wow-character.model';

@Component({
  selector: 'app-wow-guild-card',
  templateUrl: './wow-guild-card.component.html',
  styleUrls: ['./wow-guild-card.component.scss'],
})
export class WowGuildCardComponent {
  char = input<WowCharacter>();
}
