import { Component, Input, OnInit } from '@angular/core';

import { Alert, AlertType } from './alert';
import { AlertService } from './alert.service';

@Component({
  selector: 'ap-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() timeout = 3000;
  alerts: Alert[] = [];

  constructor(private alertService : AlertService) { }

  ngOnInit(): void {
    this.alertService.getAlert()?.subscribe(alert => {
      if(!alert) {
        this.alerts = [];
        return;
      } else {
        this.alerts.push(alert);
        setTimeout( 
          () => { 
            this.removeAlert(alert)
          }, 
          this.timeout
        );
      }
    });
  }

  removeAlert(alertToRemove: Alert) {
    this.alerts = this.alerts.filter(alert => alert != alertToRemove);
  }

  getAlertClass(alert: Alert): string {
    if(!alert) return '';
    switch (alert.alertType) {
      case AlertType.DANGER  : return 'alert alert-danger';
      case AlertType.WARNING : return 'alert alert-warning';
      case AlertType.SUCCESS : return 'alert alert-success';
      default                : return 'alert alert-info';
    }
  }

}
