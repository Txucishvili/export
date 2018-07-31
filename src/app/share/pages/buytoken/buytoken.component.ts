import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../../_services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserdataService} from '../../../_services/userdata.service';

@Component({
  selector: 'app-buytoken',
  templateUrl: './buytoken.component.html',
  styleUrls: ['./buytoken.component.scss']
})
export class BuytokenComponent implements OnInit, OnDestroy {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private formBuild: FormBuilder,
    private userDataService: UserdataService,
  ) {
  }

  btcInfoForm: FormGroup;
  btcCashInfoForm: FormGroup;
  userHasKYCstatus: any;

  userHasOrder: any = false;
  showOurBTCWallet: any = false;
  showOurBTCCashWallet: any = false;
  userHasOrderMemory: any;
  usersByMemo: any;
  activeTab: string = 'tab-eth';

  btcSendErrors: any = [];
  btcCashSendErrors: any = [];


  resPriceBTC: any = '';
  resPriceBTCCash: any = '';


  BTCpriceTo: any = '0';
  BTCCashpriceTo: any = '0';

  BTCCurrency: any = '0';
  BTCCashCurrency: any = '0';

  copyToClipboard(wallet) {
    wallet.select();
    document.execCommand('copy');
  }

  onChangeOrderBTC(event) {
    if (this.BTCCurrency) {
      const curr = event * 1.25 / this.BTCCurrency;
      this.BTCpriceTo = Math.floor( curr * Math.pow(10, 8) ) / Math.pow(10, 8);

    }
  }
  onChangeOrderBTCash(event) {
    if (this.BTCCashCurrency) {
      this.BTCCashpriceTo = event / this.BTCCashCurrency;
    }
  }

  activateTab(tabName) {
    this.activeTab = tabName;
  }

  BTConBTCNext() {
    this.http.post(this.authService.API_BASE_URL + '/dash/buy/btc', this.btcInfoForm.value.form)
      .toPromise()
      .then(
        respons => {
          if (respons['success']) {
            this.showOurBTCWallet = true;
            this.btcSendErrors = [];
            this.resPriceBTC = respons['price'];
          } else {
            this.showOurBTCWallet = false;
            this.btcSendErrors = respons['errors'];
          }
        }
      );
  }

  BTCCashonBTCNext() {
    this.http.post(this.authService.API_BASE_URL + '/dash/buy/bch', this.btcCashInfoForm.value.form)
      .toPromise()
      .then(
        respons => {
          if (respons['success']) {
            this.showOurBTCCashWallet = true;
            this.btcCashSendErrors = [];
            this.resPriceBTCCash = respons['price'];
          } else {
            this.showOurBTCCashWallet = false;
            this.btcCashSendErrors = respons['errors'];
          }
        }
      );
  }

  ngOnInit() {
    this.btcInfoForm = new FormGroup({
      form: this.formBuild.group({
        btcWallet: ['', [Validators.required, Validators.minLength(34), Validators.maxLength(34)]],
        tokens: ['', [Validators.required, Validators.min(100)]]
      })
    });

    this.btcCashInfoForm = new FormGroup({
      form: this.formBuild.group({
        bchWallet: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(42)]],
        tokens: ['', [Validators.required, Validators.min(100)]]
      })
    });

    this.http.post(this.authService.API_BASE_URL + '/dash/buy', this.authService.tokenData)
      .toPromise()
      .then(
        respons => {
            this.userHasOrder = false;
            this.usersByMemo = respons;
            this.userHasOrderMemory = {};
            this.BTCCurrency = respons['btc_price'];
            this.BTCCashCurrency = respons['bch_price'];
            this.userHasKYCstatus = respons['user_verified'];
        },
        error => {
          console.log(error);
        }
      );
  }

  ngOnDestroy() {
    // this.userDataService.userDetailsSource.unsubscribe();
  }

}
