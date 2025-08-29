import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeDialog } from './poke-dialog.component';

describe('NgDialogComponent', () => {
  let component: PokeDialog;
  let fixture: ComponentFixture<PokeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokeDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PokeDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
