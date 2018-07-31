import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {modelGroupProvider} from '@angular/forms/src/directives/ng_model_group';
import {UserdataService} from '../../../../_services/userdata.service';
import {UserService} from '../../../../_services/user.service';
import {CountriesService} from '../../../countries.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnInit {

  constructor(
    private formBuild: FormBuilder,
    private userDataService: UserdataService,
    private userService: UserService,
    private countriService: CountriesService
  ) {
  }

  profileChange: FormGroup;
  responseMessage: any;
  outputErrorsShow: any = false;
  outputErrors: any = [];

  countriList: any = [];

  usersCountry: any = '';

  ngOnInit() {

    this.countriList = this.countriService.countries;

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
        this.usersCountry = respons['country'];
      }
    );
  }

  onChange() {
    this.userService.changeUser(this.profileChange.value.user)
      .then(
        respons => {
          this.responseMessage = respons['message'];
          this.outputErrorsShow = false;

          if (respons['errors']) {
            this.outputErrorsShow = true;
            this.responseMessage = '';
            this.outputErrors = respons['errors'];
          }
        }
      );
  }


}
