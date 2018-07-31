import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class BridgeService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {

  }

  KYCconfirmation(data) {
    return this.http.post(this.authService.API_BASE_URL + '/kyc/verify', data)
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
