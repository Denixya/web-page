import { Component, signal } from '@angular/core';
import { WorkInProgressComponent } from '../../components/work-in-progress/work-in-progress.component';
import { WowItem } from '../../components/wow-guild-card/models/wow-item.model';
import { WowGuildCardComponent } from '../../components/wow-guild-card/wow-guild-card.component';

@Component({
  selector: 'app-project-wow',
  imports: [WorkInProgressComponent, WowGuildCardComponent],
  templateUrl: './project-wow.component.html',
  styleUrl: './project-wow.component.scss',
})
export class ProjectWowComponent {
  wowItems = signal<WowItem[]>([
    {
      name: 'Drakiria',
      realmName: "Zul'jin",
      data: {
        avatarSrc: 'drakiria.png',
        avatarIconSrc: 'favicon.ico',
        factionName: 'Alliance',
        ilvl: 664,
        className: 'Priest',
        specName: 'Discipline',
        score: 2675,
      },
    },
    {
      name: 'Eliora',
      realmName: "Zul'jin",
      data: {
        avatarSrc: 'drakiria.png',
        avatarIconSrc: 'favicon.ico',
        factionName: 'Horde',
        ilvl: 664,
        className: 'Priest',
        specName: 'Holy',
        score: 260,
      },
    },
  ]);
}
