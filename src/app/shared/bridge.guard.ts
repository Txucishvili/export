import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../_services/authentication.service';

@Injectable()
export class BridgeGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private http: HttpClient
  ) {
  }

  canActivate() {
    // console.log('bg!!');
    if (this.authService.isAuthenticated) {
      return this.http.post(this.authService.API_BASE_URL + '/dash/user', this.authService.tokenData)
        .toPromise()
        .then(
          respons => {
            const errors = respons['errors'];
            for (const err of errors) {
              if (err.toString() === 'You must confirm account before accessing this page') {
                return true;
              } else if (err.toString() === 'You have to verify KYC before accessing this page' && !respons['success']) {
                this.router.navigateByUrl('/kyc-verify');
                return false;
              } else if (err.toString() === 'Your KYC verification request is pending' && !respons['success'] && respons['pending']) {
                this.router.navigateByUrl('/kyc-verify');
                return false;
              } else if (err.toString() === 'Your KYC verification request has been rejected' && !respons['success'] && respons['rejected']) {
                this.router.navigateByUrl('/kyc-verify');
                return false;
              } else {
                return false;
              }
            }
            return false;
          },
          error => {
            if (error.status === 401) {
              this.authService.removeToken();
              return false;
            }
          }
        );
    }

    this.router.navigate(['/auth']);
    return false;
  }


}
