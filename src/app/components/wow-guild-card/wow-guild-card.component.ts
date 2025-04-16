import { Component, input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { WowCharacter } from './models/wow-character.model';

@Component({
  standalone: true,
  selector: 'app-wow-guild-card',
  imports: [NgStyle],
  templateUrl: './wow-guild-card.component.html',
  styleUrls: ['./wow-guild-card.component.scss'],
})
export class WowGuildCardComponent {
  char = input<WowCharacter>();
}
