import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private http: HttpClient
  ) {
  }

  // this.router.navigateByUrl('/kyc-verify');
  canActivate() {
    if (this.authService.isAuthenticated) {
      return this.http.post(this.authService.API_BASE_URL + '/dash/user', this.authService.tokenData)
        .toPromise()
        .then(
          respons => {
            const errors = respons['errors'];
            if (errors && !respons['success']) {
              for (const err of errors) {
                if (err.toString() === 'You must confirm account before accessing this page') {
                  this.router.navigateByUrl('/confirmation');
                  return false;
                } else if (err.toString() === 'You have to verify KYC before accessing this page' && !respons['success']) {
                  this.router.navigateByUrl('/kyc-verify');
                  return false;
                } else if (err.toString() === 'Your KYC verification request is pending' && !respons['success'] && respons['pending']) {
                  this.router.navigateByUrl('/kyc-verify');
                  return false;
                } else if (err.toString() === 'Your KYC verification request has been rejected' && !respons['success'] && respons['rejected']) {
                  this.router.navigateByUrl('/kyc-verify');
                  return false;
                }
              }
            } else {
              if (respons['country'] !== null) {
                return true;
              } else {
                console.log('it here');
                this.router.navigateByUrl('/finish');
                return false;
              }
            }
          },
          error => {
            if (error.status === 500) {
              this.authService.removeToken();
              return false;
            }
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
