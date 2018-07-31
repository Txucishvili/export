import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class AdminAuthService {

  API_BASE_URL = 'https://api.keplertek.io/api';
  API_URL = 'https://api.keplertek.io/api/auth';
  TOKEN_KEY = 'token';

  constructor(private http: HttpClient, private router: Router) {
  }
  get tokenData() {
    return {token: localStorage.getItem(this.TOKEN_KEY)};
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
          console.log(respons);
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
