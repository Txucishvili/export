import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../_services/user.service';
import {UserdataService} from '../../../../_services/userdata.service';
import {AuthenticationService} from '../../../../_services/authentication.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  constructor(
    private formBuild: FormBuilder,
    private userDataService: UserdataService,
    private userService: UserService,
    private authService: AuthenticationService,
    private http: HttpClient
  ) {
  }

  walletForms: FormGroup;
  passwordForms: FormGroup;


  fullUser: any = {};

  errorsPasswords: any = [];

  noFillPasswords: any = false;

  succesMessage: any = '';
  errorMessages: any = [];

  twoFaLoader: any = false;


  onAttachWallets() {
    this.userService.changeUser_wallet(this.walletForms.value.wallets).then(
      respons => {
        if (respons['success']) {
          this.errorMessages = [];
          this.succesMessage = respons['message'];
        } else if(!respons['success'] && respons['errors']) {
          this.errorMessages = respons['errors'];
          this.succesMessage = '';
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onChangePassword() {
    if (this.passwordForms.valid && this.passwordForms['controls'].passwords['controls'].new_password.value === this.passwordForms['controls'].passwords['controls'].new_password.value) {
      this.userService.changeUser_password(this.passwordForms.value.passwords).then(
        respons => {
          this.noFillPasswords = false;

          if (respons['errors']) {
            this.errorsPasswords = respons['errors'];
          }
        },
        error => {
          console.log(error);;
        }
      );
    } else {
      this.noFillPasswords = true;
    }

  }

  onDisableTwofa() {
    this.twoFaLoader = true;
    this.http.post(this.authService.API_BASE_URL + '/dash/2fa/disable', this.authService.tokenData)
      .toPromise()
      .then(
        respons => {
          this.fullUser['2fa_activated'] = false;
          this.twoFaLoader = false;
        },
        error => {
          console.log(error);
          this.twoFaLoader = false;
        }
      );
  }

  ngOnInit() {
    this.userService.getUser().then(
      respons => {
        this.fullUser = respons;
        this.walletForms = new FormGroup({
          wallets: this.formBuild.group({
            etherWallet: [respons['etherWallet'], [Validators.required, Validators.minLength(42)]],
            btcWallet: [respons['btcWallet'], [Validators.required, Validators.minLength(34)]]
          }, {updateOn: 'blur'})
        });
      }
    );
    this.passwordForms = new FormGroup({
      passwords: this.formBuild.group({
        old_password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9]+$')]],
        new_password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9]+$')]],
        new_password_confirmation: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[a-zA-Z0-9]+$')]]
      }, {updateOn: 'blur'})
    });
  }


}
