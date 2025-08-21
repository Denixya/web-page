import { Component, inject, signal } from '@angular/core';
import { WowGuildCardComponent } from '../../components/wow-guild-card/wow-guild-card.component';
import { WowGuildService } from '../../services/wow-guild.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { LoadingMessageComponent } from '../../components/loading-message/loading-message.component';

@Component({
  selector: 'app-project-wow',
  imports: [WowGuildCardComponent, TranslatePipe, LoadingMessageComponent],
  templateUrl: './project-wow.component.html',
  styleUrl: './project-wow.component.scss',
})
export class ProjectWowComponent {
  private readonly guildService = inject(WowGuildService);

  wowChars = toSignal(
    this.guildService.getGuildRoster().pipe(
      catchError((error) => {
        console.error('Error fetching guild roster:', error);
        return of([]);
      }),
    ),
    {
      initialValue: [],
    },
  );
}
