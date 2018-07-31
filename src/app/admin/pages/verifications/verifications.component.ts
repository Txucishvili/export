import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalService} from '../../../_services/modal.service';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../../_services/authentication.service';

@Component({
  selector: 'app-verifications',
  templateUrl: './verifications.component.html',
  styleUrls: ['./verifications.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class VerificationsComponent implements OnInit {

  constructor(
    private modalService: ModalService,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
  }

  verificationData: any = [];

  loaderRefresh: any = false;

  selectedArray: any = [];
  confirmedAll: any = [];
  rejectedAll: any = [];
  allItemArray: any = [];

  isModal(html) {
    this.modalService.open(html);
  }

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
      this.http.post(this.authService.API_BASE_URL + '/admin/update/verification/approve', sendData)
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
      this.http.post(this.authService.API_BASE_URL + '/admin/update/verification/approve', sendData)
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

    if (this.verificationData.length) {
      this.http.post(this.authService.API_BASE_URL + '/admin/update/verification/approve', sendData)
        .toPromise()
        .then(
          respons => {
            this.refreshData();
          }
        );
    }
  }

  rejectAll() {
    const sendData = {
      users: this.rejectedAll
    };

    if (this.verificationData.length) {
      this.http.post(this.authService.API_BASE_URL + '/admin/update/verification/reject', sendData)
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

    this.http.post(this.authService.API_BASE_URL + '/admin/update/verification/reject', sendData)
      .toPromise()
      .then(
        respons => {
          this.refreshData();
        }
      );
  }

  refreshData() {
    this.loaderRefresh = true;
    this.http.post(this.authService.API_BASE_URL + '/admin/search/verification', this.authService.tokenData)
      .toPromise()
      .then(
        respons => {
          console.log(respons);
          this.loaderRefresh = false;
          if (respons['success']) {
            this.selectedArray = [];
            this.verificationData = respons['users'];
            this.allItemArray = this.verificationData.map(
              obj => {
                const id = obj['user_id'];
                return id;
              }
            );
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
