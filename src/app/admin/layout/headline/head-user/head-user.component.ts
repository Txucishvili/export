import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../../_services/authentication.service';
import {DashboardService} from '../../../../_services/dashboard.service';
import {UserService} from '../../../../_services/user.service';
import {UserdataService} from '../../../../_services/userdata.service';

@Component({
  selector: 'app-head-user',
  templateUrl: './head-user.component.html',
  styleUrls: ['./head-user.component.scss']
})
export class HeadUserComponent implements OnInit {

  isContextOpen = false;
  usersInfo: any;
  outeMessage: any = '';
  newUsersData: any;

  constructor(
    private authService: AuthenticationService,
    private el: ElementRef,
    private router: Router,
    private dashService: DashboardService,
    private userService: UserService,
    private userDataService: UserdataService
  ) {
  }

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    // here you can hide your menu
    if (this.isContextOpen) {
      this.isContextOpen = !this.isContextOpen;
    }
  }

  getUserInfo() {
    this.userService.getUser().then(
      respons => {
        this.usersInfo = respons;
      },
      error => {
        console.log(error);
      }
    );
  }


  ngOnInit() {
    // this.getUserInfo();
    this.userDataService.userDetails.subscribe(
      respons => {
        this.usersInfo = respons;
      }
    );
  }

  openUserContext($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.isContextOpen = !this.isContextOpen;
  }

  onLogout() {
    this.authService.logout();
  }
}
