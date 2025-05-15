import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProjectComponent } from './project.component';
import { CardComponent } from '../../components/card/card.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Mocks
class ActivatedRouteMock {
  params = of({});
  queryParams = of({});
  fragment = of('');
  data = of({});
}

describe('ProjectComponent', () => {
  let fixture: ComponentFixture<ProjectComponent>;
  let component: ProjectComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectComponent, CardComponent],
      providers: [{ provide: ActivatedRoute, useClass: ActivatedRouteMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render CardComponent', () => {
    const cardDE = fixture.debugElement.query(By.directive(CardComponent));
    expect(cardDE)
      .withContext('CardComponent debería renderizarse')
      .toBeTruthy();
  });
});
