import { Directive, ElementRef, OnInit } from '@angular/core';

import { PlatformDetectorService } from '../../../core/platform-detector/platform-detector.service';

@Directive({
  selector: '[apImmediateClick]'
})
export class ImmediateClickDirective implements OnInit {

  constructor(
    private el: ElementRef, 
    private platformDetector: PlatformDetectorService
  ) { }

  ngOnInit(): void {
    if(this.platformDetector.isPlatformBrowser()) {
      this.el.nativeElement.click();
    }
  }

}
