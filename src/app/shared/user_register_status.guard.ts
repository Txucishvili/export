import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';
import {UserService} from '../_services/user.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserRegisterStatus implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private http: HttpClient
  ) {
  }

  canActivate() {
    if (this.authService.isAuthenticated) {
      return this.http.post(this.authService.API_BASE_URL + '/dash/user', this.authService.tokenData)
        .toPromise()
        .then(
          respons => {
            if (!respons['country']) {
              return true;
            } else {
              this.router.navigateByUrl('/');
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
