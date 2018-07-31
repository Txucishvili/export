import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {BridgeService} from '../../../_services/bridge.service';
import {AuthenticationService} from '../../../_services/authentication.service';
import {UserService} from '../../../_services/user.service';

@Component({
  selector: 'app-emailconfirm',
  templateUrl: './emailconfirm.component.html',
  styleUrls: ['./emailconfirm.component.scss']
})
export class EmailconfirmComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private formBuild: FormBuilder,
    private bridgeService: BridgeService,
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) {
  }

  letterIsSend: any = false;
  isLoading: boolean = false;

  sendAgainMail() {
    this.isLoading = true;
    this.http.post(this.authService.API_BASE_URL + '/auth/confirm/resend', this.authService.tokenData)
      .toPromise().then(
      response => {
        if (response['message'] === 'Confirmation E-mail was sent') {
          this.letterIsSend = true;
          this.isLoading = false;
        }
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  logOut() {
    this.authService.logout();
  }

  ngOnInit() {}

}
