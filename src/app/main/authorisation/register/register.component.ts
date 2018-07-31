import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../_services/authentication.service';
import {AlertsService} from '../../../share/alerts.service';
import {UserService} from '../../../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuild: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private alertify: AlertsService,
    private userService: UserService
  ) {
  }

  registerForm: FormGroup;
  responseMessageShow: any = false;
  errorMessage: any;
  successMessage: any;

  hasRefferal: any = '';

  loader: any = false;

  stepTwo: any = false;
  registerFormStepTwo: FormGroup;
  getToken: any = '';

  ngOnInit() {
    this.registerForm = new FormGroup({
      user: this.formBuild.group({
        firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[A-z]+$')]],
        lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[A-z]+$')]],
        email: ['', [Validators.required, Validators.email]],
        referral: [localStorage.getItem('referral')],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
      }, {updateOn: 'blur'})
    });
    this.registerFormStepTwo = new FormGroup({
      user: this.formBuild.group({
        token: ['', [Validators.required]],
        country: ['', [Validators.required, Validators.minLength(2)]],
        state: ['', [Validators.required, Validators.minLength(2)]],
        city: ['', [Validators.required, Validators.minLength(2)]],
        address: ['', [Validators.required, Validators.minLength(2)]],
        mobile: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]+$')]],
      }, {updateOn: 'blur'})
    });
  }

  onRegisterUser() {
    this.loader = true;
    if (this.registerForm.valid) {
      this.authService.signup(this.registerForm.value.user, true).then(
        respons => {
          if (respons.success) {
            this.alertify.success(true, ['You successfully registred']);
            this.loader = false;
            // this.stepTwo = true;
            // this.getToken = respons['access_token'];
          } else {
            if (respons['errors']) {
              this.alertify.error(true, respons['errors']);
            }
            this.loader = false;
          }
        }
      );
    } else {
      this.alertify.danger(true, ['Please fill all fileds correctly!']);
      this.loader = false;
    }
  }

  finishRegister() {
    // this.registerFormStepTwo.controls['user'].controls['token'].setValue(this.getToken);
    if (this.getToken) {
      this.userService.changeUser(this.registerFormStepTwo.value.user)
        .then(
          respons => {
            if (respons['errors']) {
              this.alertify.error(true, respons['errors']);
            } else if (respons['success']) {
              this.alertify.success(true, ['You successfully registred']);
            }
          }
        );
    }
  }

}
