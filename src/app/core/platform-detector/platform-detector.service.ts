import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformDetectorService {

  /** Injection Token: PLATFORM_ID */
  constructor(@Inject(PLATFORM_ID) private platformId: string) { }

  isPlatformBrowser() {
    return isPlatformBrowser(this.platformId);
  }
}
