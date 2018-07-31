import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {NotificationService} from './notification.service';

@Injectable()
export class AuthenticationService {

  API_BASE_URL = 'https://api.keplertek.io/api';
  API_URL = 'https://api.keplertek.io/api/auth';
  TOKEN_KEY = 'token';

  constructor(
    private http: HttpClient,
              private router: Router,
              private notify: NotificationService
  ) {
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get tokenData() {
    return {token: localStorage.getItem(this.TOKEN_KEY)};
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  get isValidUser() {

    const tokenData = {
      token: this.token
    };

    return this.http.post(this.API_BASE_URL + '/dash/user', tokenData).toPromise().then(
      respons => {
        return true;
      },
      error => {
        if (error.status === 401) {
          return false;
        }
      }
    );
  }

  clear() {
    return localStorage.removeItem(this.TOKEN_KEY);
  }

  logout() {
    const sendToken = {
      token: this.token
    };

    this.http.post(this.API_BASE_URL + '/auth/logout', this.tokenData).toPromise().then(
      response => {
        localStorage.removeItem(this.TOKEN_KEY);
        this.router.navigateByUrl('/auth');
        // console.log(response);
        // this.notify.push('success','true','Logged out',response['message'],);
      },
      error => {
        console.log(error);
      }
    );

  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigateByUrl('/auth');
  }

  check(data) {
    const headers = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Cache-Control': 'no-cache'})
    };

    return this.http.post(this.API_URL + '/login', JSON.stringify(data), headers)
      .toPromise()
      .then(
        (respons: any) => {
          const returnData = {
            isTwofa: false,
            success: false
          };
          if (!respons['success'] && respons['errors']) {
            respons['errors'].forEach(err => {
              if (err === 'Complete 2FA before accessing dashboard') {
                returnData.success = respons['success'];
                returnData.isTwofa = true;
              } else {
                returnData.success = respons['success'];
                returnData.isTwofa = false;
              }
            });
          } else {
            returnData.success = respons['success'];
            if (respons['success']) {
              returnData.isTwofa = false;
              localStorage.setItem(this.TOKEN_KEY, respons.access_token);
              this.router.navigateByUrl('/');
            }
          }
          return returnData;
        },
        error => {
          console.log('No Authorize');
          return false;
        }
      );
  }

  login(data) {
    const headers = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Cache-Control': 'no-cache'})
    };

    return this.http.post(this.API_URL + '/login', JSON.stringify(data), headers)
      .toPromise()
      .then(
        (respons: any) => {
          localStorage.setItem(this.TOKEN_KEY, respons.access_token);
          this.router.navigateByUrl('/');
        },
        error => {
          console.log('No Authorize');
          return false;
        }
      );
  }


  login2fa(data) {
    const headers = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Cache-Control': 'no-cache'})
    };

    return this.http.post(this.API_URL + '/2fa/check', JSON.stringify(data), headers)
      .toPromise()
      .then(
        (res: any) => {
          if (res['success']) {
            localStorage.setItem(this.TOKEN_KEY, res.access_token);
            this.router.navigateByUrl('/');
            return res;
          } else {
            return res;
          }
        }
      );
  }


  signup(model: any, autologin: any = false) {
    const headers = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Cache-Control': 'no-cache'})
    };

    const infoTologin = {
      email: model.email,
      password: model.password
    };

    return this.http.post(this.API_URL + '/register', JSON.stringify(model), headers)
      .toPromise()
      .then((
        res: any) => {
          if (res['success'] === false) {
            return res;
          } else {
            if (autologin) {
              this.login(infoTologin);
            }
            return res;
          }
        },
        error => {
          return error;
        }
      );
  }

  lostpass(email: any) {
    return this.http.post(this.API_URL + '/password/email', email)
      .toPromise()
      .then(
        (res: any) => {
          return res;
        },
        error => {
          return error;
        }
      );
  }


  changelostPass(model: any) {
    return this.http.post(this.API_URL + '/password/reset', model)
      .toPromise()
      .then(
        (res: any) => {
          return res;
        },
        error => {
          return error;
        }
      );
  }

  getAccount() {
    return this.http.post(this.API_BASE_URL + '/dash/user', this.tokenData)
      .toPromise()
      .then(
        data => {
          return data;
        },
        err => console.log(err)
      );
  }

  getDashboard() {

  }
}
