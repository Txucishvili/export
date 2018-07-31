import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {resolveReflectiveProviders} from '@angular/core/src/di/reflective_provider';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../_services/authentication.service';
import {BridgeService} from '../../../_services/bridge.service';
import {UserService} from '../../../_services/user.service';

@Component({
  selector: 'app-kycconfirm',
  templateUrl: './kycconfirm.component.html',
  styleUrls: ['./kycconfirm.component.scss']
})
export class KycconfirmComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private formBuild: FormBuilder,
    private bridgeService: BridgeService,
    private userService: UserService,
    private router: Router
  ) {
  }

  isLoading: any = false;

  kycVerify: FormGroup;

  kycPending: any = false;
  kycConfirmed: any = false;
  kycRejected: any = false;
  kycForm: any = false;

  userIsCatchd: any;


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
    if (this.kycForm && this.kycVerify['controls'].user.valid && this.documentFrontDetails['successPhoto'] && this.documentBackDetails['successPhoto'] && this.documentPhotoDetails['successPhoto']) {
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
            this.isLoading = false;
            this.kycPending = true;
            this.kycRejected = false;
            this.kycForm = false;

            this.dangerMessage = false;
            this.errorMessage = false;
            this.successMessage = true;
          } else {
            if (respons['errors']) {
              for (let err of respons['errors']) {
                this.isLoading = false;
                this.kycPending = false;
                this.kycRejected = false;

                this.dangerMessage = false;
                this.errorMessage = false;
                this.successMessage = false;

                this.errorMessageSe = respons['errors'];

              }
            }
          }
        },
        error => {
          console.log(error);
          this.dangerMessage = false;
          this.errorMessage = true;
          this.successMessage = false;
          this.isLoading = false;
        }
      );
    } else {
      this.dangerMessage = true;
      this.errorMessage = false;
      this.successMessage = false;
    }
  }


  ngOnInit() {
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
          const errors = respons['errors'];
          if (respons['user']) {
            const userRes = respons['user'];
            this.userIsCatchd = userRes;
            this.kycVerify['controls'].user['controls'].firstname.setValue(userRes.firstName);
            this.kycVerify['controls'].user['controls'].lastname.setValue(userRes.lastName);
            this.kycVerify['controls'].user['controls'].email.setValue(userRes.email);
            this.kycVerify['controls'].user['controls'].mobile.setValue(userRes.mobile);
            this.kycVerify['controls'].user['controls'].country.setValue(userRes.country);
            this.kycVerify['controls'].user['controls'].city.setValue(userRes.city);
            this.kycVerify['controls'].user['controls'].address.setValue(userRes.address);
            this.kycVerify['controls'].user['controls'].state.setValue(userRes.state);
            this.kycVerify['controls'].user['controls'].etherWallet.setValue(userRes.etherWallet);
          }
          if (errors) {
            for (const err of errors) {
              // console.log(err);
              if (err.toString() === 'You must confirm account before accessing this page') {
                // console.log('not verified');
                this.router.navigateByUrl('/confirmation');
                this.kycPending = false;
                this.kycRejected = false;
                return true;
              } else if (err.toString() === 'You have to verify KYC before accessing this page' && !respons['success']) {
                // console.log('no kyc yet');
                this.kycPending = false;
                this.kycRejected = false;
                this.kycForm = true;
                return true;
              } else if (err.toString() === 'Your KYC verification request is pending' && respons['pending']) {
                // console.log('pending');
                this.kycPending = true;
                this.kycRejected = false;
                return true;
              } else if (err.toString() === 'Your KYC verification request has been rejected' && !respons['pending'] && respons['rejected']) {
                // console.log('rejected');
                this.kycPending = false;
                this.kycRejected = true;
                this.kycForm = true;
                this.errorServer = respons['errors'];
                return true;
              } else {
                // console.log('--- Another Way');
                return true;
              }
            }
          } else if (respons['success']) {
            this.router.navigateByUrl('/dashboard');
          } else {
            this.router.navigateByUrl('/dashboard');
          }
        }, error => {
          console.log(error);
        }
      );
    }
  }


}
