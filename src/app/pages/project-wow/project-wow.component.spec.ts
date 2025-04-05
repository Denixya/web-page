import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWowComponent } from './project-wow.component';

describe('ProjectWowComponent', () => {
  let component: ProjectWowComponent;
  let fixture: ComponentFixture<ProjectWowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectWowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectWowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
