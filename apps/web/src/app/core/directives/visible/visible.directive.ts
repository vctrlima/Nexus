import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Directive({ selector: '[nexusVisible]' })
export class VisibleDirective implements AfterViewInit {
  @Input() public isTargetElement!: boolean;
  @Output() public readonly elementVisible = new EventEmitter<boolean>();

  constructor(private element: ElementRef) {}

  public intersectionOptions = {
    root: null,
    rootMargin: '0px',
    threshold: [0, 0.5, 1],
  };

  public ngAfterViewInit() {
    const observer = new IntersectionObserver(
      this.intersectionCallback.bind(this),
      this.intersectionOptions
    );

    if (this.isTargetElement) {
      observer.observe(this.element.nativeElement);
    }
  }

  public intersectionCallback(entries: any[]) {
    entries.forEach((entry) => {
      if (entry.intersectionRatio === 1) {
        this.elementVisible.emit(true);
      } else {
        this.elementVisible.emit(false);
      }
    });
  }
}
