import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-refferal',
  templateUrl: './refferal.component.html',
  styleUrls: ['./refferal.component.scss']
})
export class RefferalComponent implements OnInit {

  constructor(
    private activRoute: ActivatedRoute,
    private router: Router,
    private cookie: CookieService
  ) {
  }

  referralID: any = '';

  ngOnInit() {
    const lastDate = new Date();
    lastDate.setDate(lastDate.getDate() + 7);

    const lastDateMinute = new Date();
    lastDateMinute.setMinutes(lastDateMinute.getMinutes() + 2);

    this.referralID = this.activRoute.snapshot.queryParams['id'];

    if (this.referralID) {
      if (this.cookie.get('ambassador').length) {
        console.log('this cookie already set');
        this.cookie.set('ambassador', this.referralID, lastDate, '', '');
        this.router.navigateByUrl('/');
      } else {
        this.router.navigateByUrl('/');
        this.cookie.set('ambassador', this.referralID, lastDate, '', '');
      }
    } else {
      this.router.navigateByUrl('/');
    }
  }

}
