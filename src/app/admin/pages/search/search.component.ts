import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalService} from '../../../_services/modal.service';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../../_services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../_services/notification.service';
import {AlertsService} from '../../../share/alerts.service';
import {CountriesService} from '../../../share/countries.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class SearchPageComponent implements OnInit {

  constructor(
    private modalService: ModalService,
    private http: HttpClient,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private alertify: AlertsService,
    private countryService: CountriesService
  ) {
  }

  searchForm: FormGroup;
  usersData: any = [];
  countriList: any = [];

  searchHit() {
    this.http.post(this.authService.API_BASE_URL + '/admin/search/user', this.searchForm['controls'].data.value)
      .toPromise()
      .then(
        respons => {
          if (respons['success'] && respons['users']) {
            this.usersData = respons['users'];
            this.alertify.clear();
          } else {
            this.usersData = [];
            this.alertify.danger(true, ['No result...']);
          }
        },
        error => {
          this.notify.push('error', 'true', 'Server error', 'server has error...');
          console.log(error);
        }
      );
  }

  ngOnInit() {

    this.countriList = this.countryService.countries;

    this.searchForm = new FormGroup({
      data: this.formBuilder.group({
        user_id: ['', [Validators.minLength(2)]],
        firstName: ['', [Validators.minLength(2)]],
        lastName: ['', [Validators.minLength(2)]],
        country: ['', [Validators.minLength(2)]],
        state: ['', [Validators.minLength(2)]],
        city: ['', [Validators.minLength(2)]],
        address: ['', [Validators.minLength(2)]],
        ethereum_wallet: ['', [Validators.minLength(2)]],
        mobile: ['', [Validators.minLength(2), Validators.pattern('^[0-9]+$')]],
        email: ['', [Validators.email]]
      })
    });
  }

}
