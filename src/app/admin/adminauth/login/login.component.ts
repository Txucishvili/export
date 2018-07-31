import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../_services/authentication.service';
import {AdminAuthService} from '../../../_services/adminauth';
import {AlertsService} from '../../../share/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private formBuild: FormBuilder,
    private authService: AuthenticationService,
    private adminAuth: AdminAuthService,
    private alertService: AlertsService
  ) {
  }

  isTwoFa: any = false;
  loginForm: FormGroup;
  loader: boolean = false;
  errorMessage: any = false;
  successMessage: any = false;
  errorsArray: any = [];

  ngOnInit() {
    if (this.authService.isAuthenticated) {
      this.authService.logout();
    }
    this.loginForm = new FormGroup({
      user: this.formBuild.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]+$')]]
      })
    });
  }

  onLogin() {
    this.successMessage = false;
    this.errorMessage = false;

    const credentials = {
      email: this.loginForm.value.user.email,
      password: this.loginForm.value.user.password
    };

    const twofacredentials = {
      email: this.loginForm.value.user.email,
      password: this.loginForm.value.user.password,
      code: this.loginForm.value.user.code
    };

    if (this.isTwoFa) {
      this.loader = true;
      this.adminAuth.login2fa(twofacredentials)
        .then(
          respons => {
            this.loader = false;
            if (!respons['success'] && respons['errors']) {
              this.alertService.error(true, respons['errors']);
            } else {
              this.alertService.success(false, ['Logged in']);
            }
          },
          error => {
            this.loader = false;
          }
        );
    } else {
      if (this.loginForm['controls'].user['controls'].email.valid && this.loginForm['controls'].user['controls'].password.valid) {
        this.loader = true;
        this.adminAuth.check(credentials).then(
          respons => {
            this.loader = false;
            if (respons) {
              if (respons && respons['isTwofa']) {
                this.isTwoFa = true;
                this.errorMessage = false;
                this.alertService.clear();
              } else {
                this.alertService.success(false, ['Logged in']);
              }
            } else {
              this.alertService.error(true, ['Invalid credentials']);
            }
          },
          error => {
            this.alertService.error(true, ['Server error']);
            console.log(error);
          }
        );
      }
    }
  }

  onLogin2Fa() {

  }

}
