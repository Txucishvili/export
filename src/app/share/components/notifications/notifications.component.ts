import {Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren} from '@angular/core';
import {NotificationService} from '../../../_services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(
    private notyService: NotificationService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
  }

  notifications: any = [];
  notificationsBox: any = this.el;
  @ViewChildren('notification') allNotifications: QueryList<ElementRef>;


  close(event, notif) {
    this.renderer.addClass(event, 'leaving');
    setTimeout(() => {
      this.notifications.splice(this.notifications.indexOf(notif, 0), 1);
    }, 200);
  }

  ngOnInit() {
    this.notyService.notifData.subscribe(
      value => {
        this.notifications.push(value);
        this.allNotifications.changes.subscribe(
          resp => {
            if (resp) {
              resp['_results'].forEach(
                (obj, i) => {
                  if (value['autoclose']) {
                    if (obj.nativeElement.getAttribute('id').toString() === this.notifications.indexOf(value, 0).toString()) {
                      setTimeout(() => {
                        this.renderer.addClass(obj.nativeElement, 'leaving');
                      }, 3000 * (i + 1));
                      setTimeout(() => {
                        this.notifications.splice(this.notifications.indexOf(value, 0), 1);
                      }, 3250 * (i + 1));
                    }
                  } else {
                    if (obj.nativeElement.getAttribute('id').toString() === this.notifications.indexOf(value, 0).toString()) {
                      setTimeout(() => {
                        this.renderer.addClass(obj.nativeElement, 'leaving');
                      }, 6000 * (i + 1));
                      setTimeout(() => {
                        this.notifications.splice(this.notifications.indexOf(value, 0), 1);
                      }, 6350 * (i + 1));
                    }
                  }
                }
              );
            }
          }
        );
      }
    );
  }

}
