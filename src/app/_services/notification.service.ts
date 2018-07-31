import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class NotificationService implements OnInit, OnDestroy {
  constructor() {
  }

  public notifications: any = new Subject();
  notifData: any = this.notifications.asObservable();

  push(type, autoclose, title, data) {
    const notif = {
      type: type,
      title: title,
      autoclose: autoclose,
      data: data
    };

    this.notifications.next(notif);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
  }
}
