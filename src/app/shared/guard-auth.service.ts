import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthenticationService} from '../_services/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  canActivate() {
    // console.log('Guard for Not Authorised Users');
    if (!this.authService.isAuthenticated) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
