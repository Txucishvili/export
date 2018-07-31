import {Component} from '@angular/core';
import {NotificationService} from '../_services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  title = 'Admin App';

  constructor(
    private notify: NotificationService
  ) {
  }
}
