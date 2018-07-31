import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../_services/authentication.service';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.scss']
})
export class ResetpassComponent implements OnInit {

  constructor(
    private formBuild: FormBuilder,
    private activRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router
  ) {
  }

  passwordForms: FormGroup;
  loader: any = '';
  catchedToken: any = '';
  errorMessage: any = false;
  successMessage: any = false;

  changePass() {
    this.loader = true;

    const sendData = {
      token: this.catchedToken,
      email: this.passwordForms.value.form['email'],
      password: this.passwordForms.value.form['password'],
      password_confirmation: this.passwordForms.value.form['password_confirmation']
    };

    this.authService.changelostPass(sendData).then(
      respons => {
        this.loader = false;
        if (respons['success'] === true) {
          this.router.navigateByUrl('/auth');
        }
      },
      error => {
        this.loader = false;
      }
    );
  }

  ngOnInit() {
    this.catchedToken = this.activRoute.snapshot.queryParams.token;

    this.passwordForms = new FormGroup({
      form: this.formBuild.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9]+$')]],
        password_confirmation: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9]+$')]]
      }, {updateOn: 'blur'})
    });
  }

}
