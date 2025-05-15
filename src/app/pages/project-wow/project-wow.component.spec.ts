import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectWowComponent } from './project-wow.component';
import { WowGuildService } from '../../services/wow-guild.service';
import { of } from 'rxjs';
import { WowCharacter } from '../../components/wow-guild-card/models/wow-character.model';

describe('ProjectWowComponent', () => {
  let fixture: ComponentFixture<ProjectWowComponent>;
  let component: ProjectWowComponent;

  const mockCharacters: WowCharacter[] = [
    {
      name: 'Thrall',
      realm: 'Durotar',
      class: 'Shaman',
      spec: 'Elemental',
      faction: 'Horde',
      ilvl: 450,
      mScore: 3200,
      avatar: 'https://url-to-avatar.png',
      inset: 'https://url-to-inset.png',
      mainRaw: 'https://url-to-main.png',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectWowComponent],
      providers: [
        {
          provide: WowGuildService,
          useValue: {
            getGuildRoster: () => of(mockCharacters),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectWowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load characters from the service into wowChars signal', () => {
    expect(component.wowChars()).toEqual(mockCharacters);
  });
});
