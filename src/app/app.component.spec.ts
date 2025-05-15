import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HeaderComponent, FooterComponent],
      providers: [provideRouter([]), provideLocationMocks()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct headerItems structure', () => {
    expect(component.headerItems.length).toBe(3);
    expect(component.headerItems[0]).toEqual({
      label: 'Inicio',
      link: '/home',
    });
    expect(component.headerItems[2].links?.[2]).toEqual({
      label: 'Formulario',
      link: '/projects/form',
    });
  });

  it('should render HeaderComponent and FooterComponent', () => {
    fixture.detectChanges();

    const headerDE = fixture.debugElement.query(By.directive(HeaderComponent));
    const footerDE = fixture.debugElement.query(By.directive(FooterComponent));

    expect(headerDE)
      .withContext('HeaderComponent debería renderizarse')
      .toBeTruthy();
    expect(footerDE)
      .withContext('FooterComponent debería renderizarse')
      .toBeTruthy();
  });
});
