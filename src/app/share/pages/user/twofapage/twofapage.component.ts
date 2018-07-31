import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../../../_services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-twofapage',
  templateUrl: './twofapage.component.html',
  styleUrls: ['./twofapage.component.scss']
})
export class TwofapageComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private formBuild: FormBuilder
  ) {
  }

  infoData: any;
  isLoader: any = false;

  succesMessage: any = false;
  errorList: any = [];

  twofaForm: FormGroup;
  twoFaLoader: any = false;

  succesMessageDisable: any = '';
  errorListDisable: any = [];

  onDisableTwofa() {
    this.twoFaLoader = true;
    this.http.post(this.authService.API_BASE_URL + '/dash/2fa/disable', this.authService.tokenData)
      .toPromise()
      .then(
        respons => {
          this.twoFaLoader = false;
          if (respons['success']) {
            this.errorListDisable = [];
            this.succesMessage = false;
            this.succesMessageDisable = respons['message'];
            this.getInfoTwoFa();
          } else {
            this.errorListDisable = respons['errors'];
            this.succesMessageDisable = '';
          }
        },
        error => {
          console.log(error);
          this.twoFaLoader = false;
        }
      );
  }

  submitTwofa() {
    this.isLoader = true;
    const dataSent = {
      code: this.twofaForm['controls'].data['controls'].code['value'],
      secret: this.infoData['data'].key
    };

    this.http.post(this.authService.API_BASE_URL + '/dash/2fa/verify', dataSent)
      .toPromise()
      .then(
        respons => {
          this.isLoader = false;
          if (!respons['success'] && respons['errors']) {
            this.errorList = respons['errors'];
            this.succesMessage = false;
          } else {
            this.errorList = [];
            this.succesMessage = true;
            this.getInfoTwoFa();
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  getInfoTwoFa() {
    this.http.post(this.authService.API_BASE_URL + '/dash/2fa/enable', this.authService.tokenData)
      .toPromise()
      .then(
        respons => {
          if (respons['success']) {
            this.infoData = respons;
          } else {
            this.infoData = respons;
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  ngOnInit() {
    this.twofaForm = new FormGroup({
      data: this.formBuild.group({
        code: ['', [Validators.required]]
      })
    });

    this.getInfoTwoFa();
  }

}
