import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class AlertsService implements OnInit, OnDestroy {
  constructor() {
  }

  public alertSource: any = new Subject();
  alertData: any = this.alertSource.asObservable();

  success(close, data) {
    const modal = {
      type: 'success',
      close: close,
      data: data
    };
    this.alertSource.next(modal);
  }

  error(close, data) {
    const modal = {
      type: 'error',
      close: close,
      data: data
    };
    this.alertSource.next(modal);
  }

  danger(close, data) {
    const modal = {
      type: 'danger',
      close: close,
      data: data
    };
    this.alertSource.next(modal);
  }

  clear() {
    const modal = {};
    this.alertSource.next(modal);
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.alertData.unsubscribe();
  }
}
