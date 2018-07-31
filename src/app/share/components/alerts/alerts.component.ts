import {Component, OnInit} from '@angular/core';
import {AlertsService} from '../../alerts.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  constructor(
    private alertService: AlertsService
  ) {
  }

  alertsData: any = {
    type: '',
    close: '',
    data: ''
  };

  ngOnInit() {
    this.alertService.alertData.subscribe(
      respons => {
        if (respons) {
          this.alertsData.type = respons['type'];
          this.alertsData.close = respons['close'];
          this.alertsData.data = respons['data'];
        }
      }
    );

  }

}
