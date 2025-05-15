import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { HeaderItem } from './models/header-item.model';
import { provideRouter } from '@angular/router';

@Component({
  standalone: true,
  imports: [HeaderComponent],
  template: `<app-header [items]="items" />`,
})
class TestHostComponent {
  items: HeaderItem[] = [
    { label: 'Inicio', link: '/' },
    {
      label: 'Proyectos',
      links: [
        { label: 'Formulario', link: '/proyectos/formulario' },
        { label: 'Wow', link: '/proyectos/wow' },
      ],
    },
  ];
}

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render header items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Inicio');
    expect(compiled.textContent).toContain('Proyectos');
    expect(compiled.textContent).toContain('Formulario');
    expect(compiled.textContent).toContain('Wow');
  });
});
