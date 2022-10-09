import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { Alert, AlertType } from './alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertSubject : Subject<Alert | null> = new Subject<Alert | null>();
  keepAfterRouteChange : boolean = false;

  constructor(private router: Router) {
    router.events.subscribe({
      next: (event) => { 
        if(event instanceof NavigationStart) {
          if(this.keepAfterRouteChange) {
            this.keepAfterRouteChange = false;
          } else {
            this.clear();
          }
        }
      }
    });
  }

  /**
   * Send an Alert type/message to who are listing to
   * 
   * @param alertType 
   * @param message 
   */
  private alert(alertType: AlertType, message: string, keepAfterRouteChange: boolean) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.alertSubject.next(new Alert(alertType, message));
  }

  success(message: string, keepAfterRouteChange: boolean = false){
    this.alert(AlertType.SUCCESS, message, keepAfterRouteChange);
  }

  warning(message: string, keepAfterRouteChange: boolean = false){
    this.alert(AlertType.WARNING, message, keepAfterRouteChange);
  }  

  danger(message: string, keepAfterRouteChange: boolean = false){
    this.alert(AlertType.DANGER, message, keepAfterRouteChange);
  }  

  info(message: string, keepAfterRouteChange: boolean = false){
    this.alert(AlertType.INFO, message, keepAfterRouteChange);
  }   

  /**
   * Interface to be subscribed to
   * 
   * @returns Observable
   */
  getAlert() {
    return this.alertSubject?.asObservable();
  }

  clear() {
    this.alertSubject.next(null);
  }
}
