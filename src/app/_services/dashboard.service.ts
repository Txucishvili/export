import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DashboardService {
  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) {
  }

  getDashboard() {
    return this.http.post(this.authService.API_BASE_URL + '/dash/index', this.authService.tokenData)
      .toPromise()
      .then(
        respons => {
          return respons;
        },
        error => {
          return error;
        }
      );
  }

  getAffiliate() {
    return this.http.post(this.authService.API_BASE_URL + '/dash/affiliate', this.authService.tokenData)
      .toPromise()
      .then(
        respons => {
          return respons;
        },
        error => {
          return error;
        }
      );
  }

  placeOrders() {
    return this.http.post(this.authService.API_BASE_URL + '/dash/reserved', this.authService.tokenData)
      .toPromise()
      .then(
        respons => {
          return respons;
        },
        error => {
          return error;
        }
      );
  }
  placeOrdersList() {
    return this.http.post(this.authService.API_BASE_URL + '/dash/unreserve', this.authService.tokenData)
      .toPromise()
      .then(
        respons => {
          return respons;
        },
        error => {
          return error;
        }
      );
  }
}
