import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../../_services/authentication.service';

@Component({
  selector: 'app-emailconfirmapply',
  templateUrl: './emailconfirmapply.component.html',
  styleUrls: ['./emailconfirmapply.component.scss']
})
export class EmailconfirmapplyComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private activRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  tokenParams: any = '';
  statusMessage: any = 'Wait...';

  setConfirmMail(param) {

    const senddata = {
      token: param
    };


    this.http.post(this.authService.API_BASE_URL + '/auth/confirm', senddata).subscribe(
      respons => {
        if (respons['errors']) {
          console.log(respons);
          const errorList = respons['errors'];
          for (const erroName of errorList) {
            if (erroName.toString() === 'Something went wrong') {
              this.statusMessage = 'Something went wrong';
            }
          }
        } else if (respons['success']) {
          this.statusMessage = 'Your Email is successfuly veryfied!';
          setTimeout(() => {
            this.router.navigateByUrl('/auth');
          }, 700);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.tokenParams = this.activRoute.snapshot.queryParams.token;
    this.setConfirmMail(this.tokenParams);
  }

}
