import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {resolveReflectiveProviders} from '@angular/core/src/di/reflective_provider';
import {Router} from '@angular/router';
import {UserService} from '../../../../_services/user.service';
import {BridgeService} from '../../../../_services/bridge.service';
import {AuthenticationService} from '../../../../_services/authentication.service';
import {AlertsService} from '../../../alerts.service';
import {CountriesService} from '../../../countries.service';

@Component({
  selector: 'app-kycpage',
  templateUrl: './kycpage.component.html',
  styleUrls: ['./kycpage.component.scss']
})
export class KycpageComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private formBuild: FormBuilder,
    private bridgeService: BridgeService,
    private userService: UserService,
    private router: Router,
    private alertify: AlertsService,
    private countryService: CountriesService

  ) {
  }

  isLoading: any = false;

  kycVerify: FormGroup;

  kycPending: any = false;
  kycConfirmed: any = false;
  kycRejected: any = false;
  kycForm: any = false;

  usersData: any;


  documentFront = '';
  documentBack = '';
  documentPhoto = '';

  documentFrontDetails: any = {};
  documentBackDetails: any = {};
  documentPhotoDetails: any = {};

  dangerMessage: any = false;
  errorMessage: any = false;
  successMessage: any = false;


  errorMessageSe: any = [];
  errorServer: any = [];


  countriList: any = [];

  countrieSelected: any = '';

  logOut() {
    this.authService.logout();
  }

  readThis(inputValue: any): void {

  }

  formatFileSize(bytes, decimalPoint) {
    if (bytes === 0) return '0 Bytes';
    let k = 1000;
    let dm = decimalPoint || 2;
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  }

  onFileChange(event, model) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      // console.log(file);
      if (model.toString() === 'documentFront') {
        this.documentFront = file;
        this.documentFrontDetails.name = file['name'];
        if (this.formatFileSize(file.size, '') < 4194304) {
          this.documentFrontDetails.errorPhoto = true;
        } else {
          this.documentFrontDetails.errorPhoto = false;
        }
        if (file.size < 4194304) {
          this.documentFrontDetails.errorPhoto = false;
          this.documentFrontDetails.successPhoto = true;
        } else {
          this.documentFrontDetails.errorPhoto = true;
          this.documentFrontDetails.successPhoto = false;
        }
      } else if (model.toString() === 'documentBack') {
        this.documentBack = file;
        this.documentBackDetails.name = file['name'];
        if (file.size < 4194304) {
          this.documentBackDetails.errorPhoto = false;
          this.documentBackDetails.successPhoto = true;
        } else {
          this.documentBackDetails.errorPhoto = true;
          this.documentBackDetails.successPhoto = false;
        }
      } else if (model.toString() === 'documentPhoto') {
        this.documentPhoto = file;
        this.documentPhotoDetails.name = file['name'];
        if (this.formatFileSize(file.size, '') < 4194304) {
          this.documentPhotoDetails.errorPhoto = true;
        } else {
          this.documentPhotoDetails.errorPhoto = false;
        }
        if (file.size < 4194304) {
          this.documentPhotoDetails.errorPhoto = false;
          this.documentPhotoDetails.successPhoto = true;
        } else {
          this.documentPhotoDetails.errorPhoto = true;
          this.documentPhotoDetails.successPhoto = false;
        }
      }
    }
  }

  sendConfirm() {
    if (this.kycVerify['controls'].user.valid && this.documentFrontDetails['successPhoto'] && this.documentBackDetails['successPhoto'] && this.documentPhotoDetails['successPhoto']) {
      this.isLoading = true;
      const formSend = new FormData();
      formSend.append('firstName', this.kycVerify.value.user.firstname);
      formSend.append('lastName', this.kycVerify.value.user.lastname);
      formSend.append('email', this.kycVerify.value.user.email);
      formSend.append('mobile', this.kycVerify.value.user.mobile);
      formSend.append('country', this.kycVerify.value.user.country);
      formSend.append('city', this.kycVerify.value.user.city);
      formSend.append('address', this.kycVerify.value.user.address);
      formSend.append('state', this.kycVerify.value.user.state);
      formSend.append('etherWallet', this.kycVerify.value.user.etherWallet);
      formSend.append('documentFront', this.documentFront);
      formSend.append('documentBack', this.documentBack);
      formSend.append('documentPhoto', this.documentPhoto);
      formSend.append('token', this.authService.token);

      this.bridgeService.KYCconfirmation(formSend).then(
        respons => {
          if (respons['success'] === true) {
            this.kycForm = false;
            this.kycPending = true;
            this.kycRejected = false;
            this.isLoading = false;
            this.alertify.error(true, respons['message']);
          } else {
            if (respons['errors']) {
              for (let err of respons['errors']) {
                this.isLoading = false;
                this.alertify.error(true, respons['errors']);
              }
            }
          }
        },
        error => {
          console.log(error);
          this.alertify.clear();
          this.isLoading = false;
        }
      );
    } else {
      this.alertify.danger(true, ['Please Fill All fields']);
    }
  }


  ngOnInit() {
    this.countriList = this.countryService.countries;

    this.kycVerify = new FormGroup({
      user: this.formBuild.group({
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        country: ['', [Validators.required]],
        city: ['', [Validators.required]],
        address: ['', [Validators.required]],
        state: ['', [Validators.required]],
        etherWallet: ['', [Validators.required, Validators.minLength(42), Validators.maxLength(42)]],
        email: ['', [Validators.required, Validators.email]]
      }),
      images: this.formBuild.group({
        documentFront: ['', [Validators.required]],
        documentBack: ['', [Validators.required]],
        documentPhoto: ['', [Validators.required]]
      })
    });
    if (this.authService.isValidUser) {
      this.userService.getUser().then(
        respons => {
          this.usersData = respons;
          const errors = respons['errors'];
          if (respons && respons['status'] === 0 || respons['status'] === 3) {
            this.kycForm = true;
            const userRes = respons['user'];
            this.kycVerify['controls'].user['controls'].firstname.setValue(respons['first_name']);
            this.kycVerify['controls'].user['controls'].lastname.setValue(respons['last_name']);
            this.kycVerify['controls'].user['controls'].email.setValue(respons.email);
            this.kycVerify['controls'].user['controls'].mobile.setValue(respons.mobile);
            this.kycVerify['controls'].user['controls'].country.setValue(respons.country);
            this.kycVerify['controls'].user['controls'].city.setValue(respons.city);
            this.kycVerify['controls'].user['controls'].address.setValue(respons.address);
            this.kycVerify['controls'].user['controls'].state.setValue(respons.state);
            this.kycVerify['controls'].user['controls'].etherWallet.setValue(respons.etherWallet);

            this.countrieSelected = respons.country;

            if (respons['status'] === 3) {
              this.kycPending = false;
              this.kycRejected = true;
            }
          } else if (respons && respons['status'] === 2) {
            this.kycPending = true;
            this.kycRejected = false;
          }
        }, error => {
          console.log(error);
        }
      );
    }
  }


}
