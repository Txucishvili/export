import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';
import {HttpClient} from '@angular/common/http';
import {UserdataService} from '../../_services/userdata.service';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

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
