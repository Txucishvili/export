import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../../_services/authentication.service';
import {FilterPipe} from 'ngx-filter-pipe';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private filter: FilterPipe
  ) {
  }

  transactions: any = [];

  ngOnInit() {
    this.http.post(this.authService.API_BASE_URL + '/dash/transactions', this.authService.tokenData)
      .toPromise()
      .then(
        respons => {
          this.transactions = respons;
        },
        error => {
          console.log(error);
        }
      );
  }

}
