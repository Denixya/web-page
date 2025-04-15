import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WowGuildCardComponent } from './wow-guild-card.component';

describe('WowGuildCardComponent', () => {
  let component: WowGuildCardComponent;
  let fixture: ComponentFixture<WowGuildCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WowGuildCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WowGuildCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
