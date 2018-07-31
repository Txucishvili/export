import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../../_services/authentication.service';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
  }

  message: any = [];
  messageTransactions: any = [];
  isLoadingToken: any = false;
  isLoadingTransaction: any = false;

  updateTokens() {
    this.isLoadingToken = true;
    this.http.post(this.authService.API_BASE_URL + '/admin/update/tokens', this.authService.tokenData)
      .toPromise()
      .then(
        resp => {
          this.isLoadingToken = false;
          console.log(resp);
          if (!resp['success'] && resp['errors']) {
            this.message = resp['errors'];
          } else {
            this.message = [];
          }
        },
        error => {
          this.isLoadingToken = false;
          console.log(error);
        }
      );

  }
  updateTransactions() {
    this.isLoadingTransaction = true;
    this.http.post(this.authService.API_BASE_URL + '/admin/update/transactions', this.authService.tokenData)
      .toPromise()
      .then(
        resp => {
          this.isLoadingTransaction = false;
          console.log(resp);
          if (!resp['success'] && resp['errors']) {
            this.messageTransactions = resp['errors'];
          } else {
            this.messageTransactions = [];
          }
        },
        error => {
          this.isLoadingTransaction = false;
          console.log(error);
        }
      );

  }

  ngOnInit() {
  }

}
