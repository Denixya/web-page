import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { AnimCardComponent } from './anim-card.component';

@Component({
  standalone: true,
  imports: [AnimCardComponent],
  template: `<app-anim-card
    [videoSrc]="videoSrc"
    [title]="title"
  ></app-anim-card>`,
})
class TestHostComponent {
  videoSrc = '';
  title = '';
}

describe('AnimCardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let sanitizer: DomSanitizer;
  let hostComponent: TestHostComponent;
  let animCardComponent: AnimCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    sanitizer = TestBed.inject(DomSanitizer);
    fixture.detectChanges();

    animCardComponent = fixture.debugElement.children[0].componentInstance;
  });

  it('should create the anim card component', () => {
    expect(animCardComponent).toBeTruthy();
  });

  it('should update safeVideoSrc when videoSrc input changes', () => {
    const testUrl = 'https://example.com/video.mp4';
    const safeUrl = sanitizer.bypassSecurityTrustResourceUrl(testUrl);

    const change = new SimpleChange(undefined, testUrl, true);
    animCardComponent.ngOnChanges({ videoSrc: change } as any);
    fixture.detectChanges();

    expect(animCardComponent.safeVideoSrc()).toEqual(safeUrl);
  });

  it('should update safeVideoSrc even if videoSrc input is empty', () => {
    const emptyUrl = '';
    const safeEmptyUrl = sanitizer.bypassSecurityTrustResourceUrl(emptyUrl);

    const change = new SimpleChange(undefined, emptyUrl, true);
    animCardComponent.ngOnChanges({ videoSrc: change } as any);
    fixture.detectChanges();

    expect(animCardComponent.safeVideoSrc()).toEqual(safeEmptyUrl);
  });
});
