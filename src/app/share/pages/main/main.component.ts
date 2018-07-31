import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserdataService} from '../../../_services/userdata.service';
import {DashboardService} from '../../../_services/dashboard.service';
import {AuthenticationService} from '../../../_services/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private dashService: DashboardService,
    private http: HttpClient,
    private userDataService: UserdataService
  ) {
  }

  dashboard: any;

  testGet: any = '';

  calcToKEP: any = 0;
  calcToBTC: any = 0;
  calcToETH: any = 0;

  kepCurr: any = 0;
  btcCurr: any = 0;
  ethCurr: any = 0;

  bonusIs: any = 0;
  bonusNumber: any = 0;

  clearDate(stage) {
    stage['end_date'] = ' ';
    stage['start_date'] = ' ';
  }




  ngOnInit() {
    this.dashService.getDashboard().then(
      respons => {
        if (respons) {
          this.calcToKEP = 1;
          this.calcToETH = respons['kep'] / respons['eth'];
          this.calcToBTC = respons['kep'] / respons['btc'];

          this.kepCurr = respons['kep'];
          this.ethCurr = respons['eth'];
          this.btcCurr = respons['btc'];

          this.bonusIs = respons['bonus'];

          this.dashboard = respons;

          // changes
          // const clearStage = {
          //   end_date: '-',
          //   start_date: '-'
          // };
          //
          // this.clearDate(this.dashboard['stages'][5]);
          // this.clearDate(this.dashboard['stages'][6]);
          // this.clearDate(this.dashboard['stages'][7]);
          // this.clearDate(this.dashboard['stages'][8]);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onFocuses(event, type) {
    if (type === 'kep') {
      console.log('iths kep');
      this.calcToBTC = (event * this.kepCurr) / this.btcCurr;
      this.calcToETH = (event * this.kepCurr) / this.ethCurr;
    } else if (type === 'btc') {
      console.log('iths btc');
      this.calcToKEP = (event * this.btcCurr) / this.kepCurr;
      this.calcToETH = (event * this.btcCurr) / this.ethCurr;
    } else if (type === 'eth') {
      console.log('iths eth');
      this.calcToKEP = (event * this.ethCurr) / this.kepCurr;
      this.calcToBTC = (event * this.ethCurr) / this.btcCurr;
    }

    this.bonusNumber = Math.round(event * this.bonusIs);
  }

}
