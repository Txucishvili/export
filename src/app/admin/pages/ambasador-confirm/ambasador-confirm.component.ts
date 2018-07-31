import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../../_services/authentication.service';

@Component({
  selector: 'app-ambasador-confirm',
  templateUrl: './ambasador-confirm.component.html',
  styleUrls: ['./ambasador-confirm.component.scss']
})
export class AmbasadorConfirmComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
  }

  verificationData: any = [];

  loaderRefresh: any = false;

  onHoverID: any;
  loaderConfirm: any = false;

  selectedArray: any = [];
  confirmedAll: any = [];
  rejectedAll: any = [];
  allItemArray: any = [];


  justPending: any = [];
  justAccepted: any = [];
  justRejected: any = [];

  showArray: any = [];

  select(id) {
    if (!this.selectedArray.includes(id)) {
      this.selectedArray.push(id);
    } else {
      this.selectedArray.splice(this.selectedArray.indexOf(id, 0), 1);
    }
  }

  acceptSelected() {
    const sendData = {
      users: this.selectedArray
    };
    if (this.verificationData.length) {
      this.http.post(this.authService.API_BASE_URL + '/admin/update/ambassador/approve', sendData)
        .toPromise()
        .then(
          respons => {
            this.refreshData();
            this.selectedArray = [];
          }
        );
    }
  }

  acceptAll() {
    const sendData = {
      users: this.allItemArray
    };

    if (this.verificationData.length) {
      this.http.post(this.authService.API_BASE_URL + '/admin/update/ambassador/approve', sendData)
        .toPromise()
        .then(
          respons => {
            this.refreshData();
          }
        );
    }
  }

  acceptOne(id) {
    const oneEl = [id];

    const sendData = {
      users: oneEl
    };

    this.onHoverID = id;
    this.loaderConfirm = true;

    if (this.verificationData.length) {
      this.http.post(this.authService.API_BASE_URL + '/admin/update/ambassador/approve', sendData)
        .toPromise()
        .then(
          respons => {
            this.loaderConfirm = false;
            this.onHoverID = '';
            this.refreshData();
          },
          error => {
            console.log(error);
            this.onHoverID = '';
            this.loaderConfirm = false;
          }
        );
    }
  }

  rejectAll() {
    const sendData = {
      users: this.rejectedAll
    };

    if (this.verificationData.length) {
      this.http.post(this.authService.API_BASE_URL + '/admin/update/ambassador/reject', sendData)
        .toPromise()
        .then(
          respons => {
            this.refreshData();
          }
        );
    }
  }

  rejectOne(id) {
    const oneEl = [id];

    const sendData = {
      users: oneEl
    };
    this.onHoverID = id;
    this.loaderConfirm = true;

    this.http.post(this.authService.API_BASE_URL + '/admin/update/ambassador/reject', sendData)
      .toPromise()
      .then(
        respons => {
          this.onHoverID = '';
          this.loaderConfirm = false;
          this.refreshData();
        },
        error => {
          console.log(error);
          this.onHoverID = '';
          this.loaderConfirm = false;
        }
      );
  }

  activeTab(tab) {
    this.showArray = tab;
  }

  refreshData() {
    this.loaderRefresh = true;
    this.http.get(this.authService.API_BASE_URL + '/admin/search/ambassador')
      .toPromise()
      .then(
        respons => {
          this.onHoverID = '';
          this.loaderRefresh = false;
          if (respons['success']) {
            this.selectedArray = [];
            this.verificationData = respons['users'];
            // this.allItemArray = this.verificationData.map(
            //   obj => {
            //     const id = obj['user_id'];
            //     return id;
            //   }
            // );
            this.justPending = this.verificationData.filter(obj => {
              if(obj.status === 2) {
                return obj;
              }
            });
            this.justAccepted = this.verificationData.filter(obj => {
              if(obj.status === 1) {
                return obj;
              }
            });
            this.justRejected = this.verificationData.filter(obj => {
              if(obj.status === 3) {
                return obj;
              }
            });
            this.activeTab(this.justPending);
          } else {
            this.verificationData = [];
          }
        },
        error => {
          this.loaderRefresh = false;
          console.log(error);
        }
      );
  }

  ngOnInit() {
    this.refreshData();
  }


}
