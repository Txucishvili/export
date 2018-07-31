import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../_services/notification.service';
import {AlertsService} from './alerts.service';

@Injectable()
export class DefaultsService {
  constructor(
    private http: HttpClient,
    private notify: NotificationService,
    private alertify: AlertsService
  ) {

  }
}
