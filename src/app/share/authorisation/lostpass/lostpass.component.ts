import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../../_services/authentication.service';

@Component({
  selector: 'app-lostpass',
  templateUrl: './lostpass.component.html',
  styleUrls: ['./lostpass.component.scss']
})
export class LostpassComponent implements OnInit {

  constructor(
    private formBuild: FormBuilder,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
  }

  lostPass: FormGroup;
  successMessage: any = false;
  errorMessage: any = false;
  loader: any = false;

  sendEmalConfirm(model) {
    this.loader = true;

    const data = {
      email: this.lostPass.value.model.email
    };

    this.authService.lostpass(data).then(
      respons => {
        setTimeout(() => {this.loader = false;}, 200);
        if (respons['success'] === false) {
          this.successMessage = false;
          this.errorMessage = true;
        } else {
          this.successMessage = true;
          this.errorMessage = false;
        }
      },
      error => {
        setTimeout(() => {this.loader = false;}, 200);
        if (error.status === 401) {
          this.successMessage = false;
          this.errorMessage = true;
        }
      }
    );
  }

  ngOnInit() {
    this.lostPass = new FormGroup({
      model: this.formBuild.group({
        email: ['', [Validators.required, Validators.email]]
      })
    });
  }

}
