import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserdataService} from '../../../../_services/userdata.service';
import {UserService} from '../../../../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(
    private userDataService: UserdataService,
    private userService: UserService
  ) {
  }

  userInformation: any = '';

  getUser() {
    this.userService.getUser().then(
      respons => {
        this.userInformation = respons;
      }
    );
  }

  ngOnInit() {
    this.getUser();
  }

  ngOnDestroy() {
  }

}
