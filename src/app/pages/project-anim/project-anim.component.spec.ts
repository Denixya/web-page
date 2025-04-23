import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAnimComponent } from './project-anim.component';

describe('ProjectAnimComponent', () => {
  let component: ProjectAnimComponent;
  let fixture: ComponentFixture<ProjectAnimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectAnimComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectAnimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
