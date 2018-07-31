import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../../_services/authentication.service';

@Component({
  selector: 'app-messages',
  templateUrl: './updatewallet.component.html',
  styleUrls: ['./updatewallet.component.scss']
})
export class UpdatewalletComponent implements OnInit {

  constructor(
    private formBulder: FormBuilder,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
  }

  walletForm: FormGroup;
  isLoading: any = false;
  errorList: any = [];
  succesMessage: any = '';
  dangerMessage: any = false;

  submitBTN() {
    this.isLoading = true;
    this.http.post(this.authService.API_BASE_URL + '/dash/distribution', this.walletForm.value.form)
      .toPromise()
      .then(
        respons => {
          this.isLoading = false;

          if (respons['success']) {
            this.succesMessage = respons['message'];
            this.errorList = [];
            this.dangerMessage = false;
          } else {
            this.succesMessage = '';
            this.errorList = respons['errors'];
            this.dangerMessage = false;
          }

          console.log(respons);
        },
        error => {
          this.isLoading = false;
          if (error['status'] === 500) {
            console.log('here');
            this.succesMessage = '';
            this.errorList = [];
            this.dangerMessage = true;
          }
        }
      );
  }

  ngOnInit() {
    this.walletForm = new FormGroup({
      form: this.formBulder.group({
        wallet: ['', [Validators.required, Validators.maxLength(42), Validators.minLength(42)]]
      })
    });
    this.http.get(this.authService.API_BASE_URL + '/dash/distribution/wallet')
      .toPromise()
      .then(
        respons => {
          if (respons['success'] && respons['wallet']) {
            this.walletForm['controls'].form['controls'].wallet.setValue(respons['wallet']);
          }
        },
        error => {
          console.log(error);
        }
      );
  }


}
