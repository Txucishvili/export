import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../../_services/authentication.service';
import {DashboardService} from '../../../_services/dashboard.service';

@Component({
  selector: 'app-unplaceorder',
  templateUrl: './unplaceorder.component.html',
  styleUrls: ['./unplaceorder.component.scss']
})
export class UnplaceorderComponent implements OnInit {

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

  sendTokensToUnOrder() {
    const sendData = {
      tokens_amount: this.unplaceOrderForm.value.data.token
    };

    if (this.unplaceOrderForm.valid && this.unplaceOrderForm.value) {
      this.isLoadingUnOrder = true;
      this.http.post(this.authService.API_BASE_URL + '/dash/unreserve', sendData)
        .toPromise()
        .then(
          respons => {
            this.isLoadingUnOrder = false;
            if (!respons['success'] && respons['errors']) {
              this.unReservErrors = respons['errors'];
              this.unReservMessage = '';
            } else if (respons['success'] && respons['message']) {
              this.unReservMessage = respons['message'];
              this.unReservErrors = [];
              this.userAmount = respons['total_reserved'];
              this.unplaceOrderForm['controls'].data['controls'].token.setValue(0);
            }
          },
          error => {
            console.log(error);
          }
        );
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
