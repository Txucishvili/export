import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {UserdataService} from '../../_services/userdata.service';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private userDataService: UserdataService,
    private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.userService.getUser().then(
      respons => {
        this.userDataService.userDetailsSource.next(respons);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
  }

}
