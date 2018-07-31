import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AdminCanActivateViaAuthGuard implements CanActivate {

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
            if (respons['isAdminUser'] === 1 || respons['isAdminUser'] === 2) {
              console.log('isAdmin');
              return true;
            } else {
              // console.log('no admin');
              this.authService.clear();
              return false;
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
