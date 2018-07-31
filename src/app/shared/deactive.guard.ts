import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../_services/authentication.service';

@Injectable()
export class DeactiveGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private http: HttpClient
  ) {
  }

  canActivate() {
    this.router.navigateByUrl('/');
    return false;
  }


}
