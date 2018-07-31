import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../../_services/authentication.service';

@Component({
  selector: 'app-adminparametrs',
  templateUrl: './parametrs.component.html',
  styleUrls: ['./parametrs.component.scss']
})
export class ParametrsComponent implements OnInit {

  constructor(
    private formBuild: FormBuilder,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
  }

  configForm: FormGroup;

  errorLists: any = [];
  succesMessage: any = false;

  isLoading: any = false;

  updateConfig() {
    this.isLoading = true;
    this.http.post(this.authService.API_BASE_URL + '/admin/update/parameters', this.configForm['controls'].data['value'])
      .toPromise()
      .then(
        respons => {
          this.isLoading = false;
          if(!respons['success'] && respons['errors']) {
            this.errorLists = respons['errors'];
            this.succesMessage = false;
          } else {
            this.errorLists = [];
            this.succesMessage = true;
          }
        },
        error => {
          this.isLoading = false;
          console.log(error);
        }
      );
  }

  ngOnInit() {
    this.configForm = new FormGroup({
      data: this.formBuild.group({
        bch: ['', []],
        btc: ['', []],
        eth: ['', []],
        ethereum_wallet: ['', []],
        kep: ['', []],
        reserved_ethereum_wallet: ['', []],
        bitcoin_wallet: ['', []],
        stage_sold: ['', []],
        total_users: ['', []],
        verified_users: ['', []]
      })
    });
    this.http.post(this.authService.API_BASE_URL + '/admin/search/parameters', this.authService.tokenData)
      .toPromise()
      .then(
        respons => {
          const form = this.configForm['controls'].data['controls'];
          form['bch'].setValue(respons['bch']);
          form['btc'].setValue(respons['btc']);
          form['eth'].setValue(respons['eth']);
          form['ethereum_wallet'].setValue(respons['ethereum_wallet']);
          form['kep'].setValue(respons['kep']);
          form['reserved_ethereum_wallet'].setValue(respons['reserved_ethereum_wallet']);
          form['stage_sold'].setValue(respons['stage_sold']);
          form['total_users'].setValue(respons['total_users']);
          form['verified_users'].setValue(respons['verified_users']);
          form['bitcoin_wallet'].setValue(respons['bitcoin_wallet']);
        },
        error => {
          console.log(error);
        }
      );
  }
}
