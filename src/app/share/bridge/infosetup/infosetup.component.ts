import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../_services/user.service';
import {UserdataService} from '../../../_services/userdata.service';
import {AlertsService} from '../../alerts.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../_services/authentication.service';
import {CountriesService} from '../../countries.service';

@Component({
  selector: 'app-infosetup',
  templateUrl: './infosetup.component.html',
  styleUrls: ['./infosetup.component.scss']
})
export class InfosetupComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuild: FormBuilder,
    private userDataService: UserdataService,
    private userService: UserService,
    private alertify: AlertsService,
    private authService: AuthenticationService,
    private countryService: CountriesService
  ) {
  }

  profileChange: FormGroup;
  responseMessage: any;
  outputErrorsShow: any = false;
  outputErrors: any = [];


  countriList: any = [];

  ngOnInit() {
    this.countriList = this.countryService.countries;

    this.userService.getUser().then(
      respons => {
        this.profileChange = new FormGroup({
          user: this.formBuild.group({
            firstName: [respons['first_name'], [Validators.required, Validators.minLength(2)]],
            lastName: [respons['last_name'], [Validators.required, Validators.minLength(2)]],
            country: [respons['country'], [Validators.required, Validators.minLength(2)]],
            state: [respons['state'], [Validators.required, Validators.minLength(2)]],
            city: [respons['city'], [Validators.required, Validators.minLength(2)]],
            address: [respons['address'], [Validators.required, Validators.minLength(2)]],
            mobile: [respons['mobile'], [Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]+$')]],
          }, {updateOn: 'blur'})
        });
      }
    );
  }

  onChange() {
    this.userService.changeUser(this.profileChange.value.user)
      .then(
        respons => {
          if (respons['errors']) {
            this.alertify.error(true, respons['errors']);
          } else if (respons['success']) {
            this.router.navigateByUrl('/');
            this.alertify.success(true, ['You successfully registred']);
          }
        }
      );
  }

}
