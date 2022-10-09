import { Injectable, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Quemsou } from './quemsou';

@Injectable({
  providedIn: 'root'
})
export class QuemsouService {
  private quemsou! : Quemsou;
  private quemsouSubject = new BehaviorSubject<Quemsou>({ meunome: ''});

  constructor() { }

  /**
   * Observável para futura subscrição de quem quizer "ouvir"
   * @returns 
   */
  getQuemsou() {
    return this.quemsouSubject.asObservable();
  }

  setQuemsou(eu : Quemsou) {
    this.quemsou = eu; 
    this.decodeAndNotify()
  }

  /** 
   * Emite o "Quemsou" para quem estiver "ouvindo"
   */
  private decodeAndNotify() {
    this.quemsouSubject.next(this.quemsou);
  }  

}
