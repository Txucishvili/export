import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../../_services/authentication.service';
import {DashboardService} from '../../../_services/dashboard.service';

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.scss']
})
export class PlaceorderComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private dashService: DashboardService,
    private formBuild: FormBuilder,
    private http: HttpClient
  ) {
  }

  isLoading: any = false;
  isLoadingUnOrder: any = false;

  priceToETH: any = 0;
  priceToUSD: any = 0;

  ethCurrency: any = 0;
  usdCurrency: any = 0;
  userAmount: any = 0;
  ethAmount: any = 0;

  reservedTokens: any = 0;

  dangerMessage: any = false;
  dangerMessageFill: any = false;
  successMessage: any = false;
  isBonus: any;
  isBonusShow: any = false;

  placeOrderForm: FormGroup;

  unplaceOrderForm: FormGroup;
  showToUnOrder: any = false;
  dangerMessageFillUnOrder: any = false;
  unReservErrors: any = [];
  unReservMessage: any = '';

  onChangeOrder(event) {
    if (this.ethCurrency) {
      this.priceToETH = this.ethCurrency * event;
    }
    if (this.usdCurrency) {
      this.priceToUSD = this.usdCurrency * event;
    }
  }

  sendReservedTokens() {
    const sendData = {
      tokens_amount: this.placeOrderForm.value.data.token
    };
    if (this.placeOrderForm.valid && this.placeOrderForm.value) {
      if (this.placeOrderForm.value.data.token < 100) {
        this.dangerMessage = true;
        this.dangerMessageFill = false;
      } else {
        this.isLoading = true;
        this.http.post(this.authService.API_BASE_URL + '/dash/reserve', sendData)
          .toPromise()
          .then(
            respons => {
              this.dangerMessage = false;
              this.dangerMessageFill = false;
              if (respons['success'] === true) {
                this.successMessage = true;
                this.reservedTokens = this.placeOrderForm['controls'].data['controls'].token.value;
                this.placeOrderForm['controls'].data['controls'].token.setValue(0);
                this.userAmount = respons['total_tokens'];
                this.ethAmount = respons['total_eth'];
                this.isLoading = false;
              }

            },
            error => {
              this.isLoading = false;
              this.dangerMessage = false;
              this.dangerMessageFill = false;

            }
          );
      }
    } else {
      this.dangerMessageFill = true;
    }
  }

  ngOnInit() {
    this.placeOrderForm = new FormGroup({
      data: this.formBuild.group({
        token: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
      })
    });
    this.unplaceOrderForm = new FormGroup({
      data: this.formBuild.group({
        token: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
      })
    });
    this.dashService.placeOrders().then(
      respons => {
        if (respons['token_to_ether']) {
          this.ethCurrency = respons['token_to_ether'];
        }
        if (respons['token_to_usd']) {
          this.usdCurrency = respons['token_to_usd'];
        }
        if (respons['reserved_tokens']) {
          this.userAmount = respons['reserved_tokens'];
        }
        if (respons['total_eth']) {
          this.ethAmount = respons['total_eth'];
        }
        if (respons['bonus']) {
          this.isBonus = respons['bonus'] * 100;
          this.isBonusShow = true;
        }
      },
      error => {
        return error;
      }
    );
  }

}
