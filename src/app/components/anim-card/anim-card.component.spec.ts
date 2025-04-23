import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimCardComponent } from './anim-card.component';

describe('AnimCardComponent', () => {
  let component: AnimCardComponent;
  let fixture: ComponentFixture<AnimCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
