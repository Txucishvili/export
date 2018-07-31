import {Injectable, OnInit} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) {
  }

  userData: any;

  get usersToken() {
    console.log(this.userData);
    return this.userData.tokens;
  }

  getUser(consoles = false) {
    return this.http.post(this.authService.API_BASE_URL + '/dash/user', this.authService.tokenData)
      .toPromise()
      .then(
        data => {
          if (consoles) {
            console.log('userservice is geted');
          }
          return data;
        },
        err => {
          if (consoles) {
            console.log(err);
          }
          return err;
        }
      );
  }

  changeUser(userDetails: any) {
    return this.http.post(this.authService.API_BASE_URL + '/dash/profile', userDetails)
      .toPromise()
      .then(
        data => {
          return data;
        },
        err => {
          return err;
        }
      );
  }


  changeUser_wallet(userDetails: any) {
    return this.http.post(this.authService.API_BASE_URL + '/dash/settings', userDetails)
      .toPromise()
      .then(
        data => {
          return data;
        },
        err => {
          return err;
        }
      );
  }


  changeUser_password(userDetails: any) {
    return this.http.post(this.authService.API_BASE_URL + '/dash/settings/password', userDetails)
      .toPromise()
      .then(
        data => {
          return data;
        },
        err => {
          return err;
        }
      );
  }

  ngOnInit() {
  }

}
