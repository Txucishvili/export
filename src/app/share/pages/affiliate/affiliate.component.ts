import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../../_services/dashboard.service';

@Component({
  selector: 'app-affiliate',
  templateUrl: './affiliate.component.html',
  styleUrls: ['./affiliate.component.scss']
})
export class AffiliateComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService
  ) { }

  affiliatePage:any ;

  ngOnInit() {
    this.dashboardService.getAffiliate().then(
      respons => {
        // console.log(respons);
        this.affiliatePage = respons;
      },
      error => {
        console.log(error);
      }
    )
  }

}
