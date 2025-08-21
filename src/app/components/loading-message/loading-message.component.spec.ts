import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingMessageComponent } from './loading-message.component';

describe('LoadingMessageComponent', () => {
  let component: LoadingMessageComponent;
  let fixture: ComponentFixture<LoadingMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
