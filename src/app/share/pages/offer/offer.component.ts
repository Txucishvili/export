import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationGuard} from '../../../shared/guard-auth.service';
import {AuthenticationService} from '../../../_services/authentication.service';
import {NotificationService} from '../../../_services/notification.service';
import {UserdataService} from '../../../_services/userdata.service';
import {UserService} from '../../../_services/user.service';
import {toPromise} from 'rxjs-compat/operator/toPromise';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit, AfterViewInit {

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private notify: NotificationService,
    private userService: UserService,
    private cookie: CookieService
  ) {
  }

  offerForm: FormGroup;
  btcETHswitch: any = true;

  canAccess: any = false;
  hideForm: any = true;
  userHaveForm: any = false;
  userHaveNoKYC: any = false;

  generateForm: any = false;
  buyForm: any = false;

  myStyle: object = {};
  myParams: object = {};
  width: any = 100;
  height: any = 'auto';

  loader: any = false;
  loaderCheck: any = false;

  pendingRequest: any;

  generateMessage: any;

  activedWallets: any;
  activedWallet: any;
  expireDate: any;

  checkstatusMessage: any;
  confirmedMessage: any;

  rejectedFormMessage: any;

  expiredDateMessage: any;
  oneMessageGenerate: any = true;

  contentLoader: any = true;

  switchCripto(type) {
    if (type === 'btc') {
      this.offerForm['controls'].data['controls'].amount.setValue('');
      this.offerForm['controls'].data['controls'].currency.setValue(type);
      this.btcETHswitch = type;
    } else if (type === 'eth') {
      this.offerForm['controls'].data['controls'].amount.setValue('');
      this.offerForm['controls'].data['controls'].currency.setValue(type);
      this.btcETHswitch = type;
    } else if (type === 'btch') {
      this.offerForm['controls'].data['controls'].amount.setValue('');
      this.offerForm['controls'].data['controls'].currency.setValue(type);
      this.btcETHswitch = type;
    }
  }

  submitForm() {
    if (this.offerForm.controls['data'].valid) {
      this.http.post(this.authService.API_BASE_URL + '/dash/offer', this.offerForm.controls['data'].value)
        .toPromise()
        .then(
          respons => {
            if (respons['errors']) {
              this.notify.push('error', 'true', 'Error', respons['errors'][0]);
            }
            if (respons['success']) {
              this.rejectedFormMessage = '';
              this.hideForm = true;
              this.userHaveForm = true;
            }
          },
          error => {
            console.log(error);
          }
        );
    }
  }

  checkStatus() {
    this.loaderCheck = true;
    this.checkstatusMessage = '';
    const apiLink = this.authService.API_BASE_URL + '/dash/offer/check?ambassador=' + this.cookie.get('ambassador');
    this.http.get(apiLink).toPromise().then(
      respons => {
        this.loaderCheck = false;
        this.checkstatusMessage = respons['errors'];
        if (respons['state'] === 'confirmed') {
          this.checkstatusMessage = respons['message'];
          this.confirmedMessage = respons['message'];
          this.generateForm = false;
          this.buyForm = false;
        }
      },
      error => {
        this.loaderCheck = false;
      }
    );
  }

  setupPartials() {
    this.myStyle = {
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      'display': 'flex',
      'align-items': 'center',
      'overflow': 'hidden'
    };

    this.myParams = {
      particles: {
        number: {
          value: 50,
          density: {enable: false, value_area: 1104.8066982851817}
        },
        color: {value: '#141e3e'},
        shape: {
          type: 'circle',
          stroke: {width: 2, color: '#1c2237'},
          polygon: {nb_sides: 5},
          image: {src: 'img/github.svg', width: 100, height: 100}
        },
        opacity: {
          value: 0.1736124811591,
          random: false,
          anim: {enable: false, speed: 1, opacity_min: 0.1, sync: false}
        },
        size: {
          value: 3,
          random: true,
          anim: {enable: false, speed: 40, size_min: 0.1, sync: false}
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#141e3e',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {enable: false, rotateX: 600, rotateY: 1200}
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {enable: false, mode: 'repulse'},
          onclick: {enable: false, mode: 'push'},
          resize: true
        },
        modes: {
          grab: {distance: 400, line_linked: {opacity: 1}},
          bubble: {distance: 400, size: 40, duration: 2, opacity: 8, speed: 3},
          repulse: {distance: 200, duration: 0.4},
          push: {particles_nb: 4},
          remove: {particles_nb: 2}
        }
      },
      retina_detect: true
    };
  }

  generateWallet() {
    this.loader = true;

    this.http.get(this.authService.API_BASE_URL + '/dash/offer/generate').toPromise().then(
      respons => {
        this.hideForm = true;
        this.buyForm = true;
        this.generateForm = false;
        if (this.buyForm) {
          this.loader = false;
          this.activedWallets = respons['addresses'];
          this.activedWallet = respons['addresses']['ethereum'];
          this.expireDate = respons['expires_at'];
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  activeWallet(type) {
    if (this.activedWallet !== this.activedWallets[type]) {
      this.activedWallet = this.activedWallets[type];
    }
  }

  ngAfterViewInit() {

  }
  copyToClipboard(wallet) {
    wallet.select();
    document.execCommand('copy');
  }
  ngOnInit() {
    if (window['screen'].availWidth < 764) {
      this.height = 'auto';

    } else {
      this.height = 'auto';
    }

    this.myStyle = {
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      'overflow': 'hidden'
    };
    this.myParams = {
      particles: {
        number: {
          value: 50,
          density: {enable: false, value_area: 1104.8066982851817}
        },
        color: {value: '#141e3e'},
        shape: {
          type: 'circle',
          stroke: {width: 2, color: '#1c2237'},
          polygon: {nb_sides: 5},
          image: {src: 'img/github.svg', width: 100, height: 100}
        },
        opacity: {
          value: 0.1736124811591,
          random: false,
          anim: {enable: false, speed: 1, opacity_min: 0.1, sync: false}
        },
        size: {
          value: 3,
          random: true,
          anim: {enable: false, speed: 40, size_min: 0.1, sync: false}
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#141e3e',
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {enable: false, rotateX: 600, rotateY: 1200}
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {enable: false, mode: 'repulse'},
          onclick: {enable: false, mode: 'push'},
          resize: true
        },
        modes: {
          grab: {distance: 400, line_linked: {opacity: 1}},
          bubble: {distance: 400, size: 40, duration: 2, opacity: 8, speed: 3},
          repulse: {distance: 200, duration: 0.4},
          push: {particles_nb: 4},
          remove: {particles_nb: 2}
        }
      },
      retina_detect: true
    };

    this.offerForm = new FormGroup({
      data: this.formBuilder.group({
        question1: ['', [Validators.required, Validators.minLength(1)]],
        question2: ['', [Validators.required, Validators.minLength(1)]],
        amount: ['', [Validators.required]],
        currency: ['eth', [Validators.required]]
      })
    });


    this.contentLoader = true;
    const apiLink = this.authService.API_BASE_URL + '/dash/offer?ambassador=' + this.cookie.get('ambassador');
    this.http.get(apiLink).toPromise().then(
      respons => {
        this.contentLoader = false;
        if (respons['errors']) {
          respons['errors'].forEach((obj) => {
            if (obj === 'Your request is pending') {
              this.hideForm = true;
              this.userHaveForm = true;
            } else if (obj === 'You have to verify KYC before accessing this page' || obj === 'Your KYC verification request has been rejected' || obj === 'Your KYC verification request is pending') {
              this.userHaveNoKYC = true;
              this.hideForm = true;
            } else if (obj === 'Your request has been rejected') {
              this.rejectedFormMessage = 'Dear  applicant  for Investor of the Future program, \n' +
                '\n' +
                'Thank you for your interest and commitment towards Keplertek.\n' +
                'We reviewed your application. Unfortunately, we regret to inform you that your request has been rejected. \n' +
                'The reasons might be any of the following: \n' +
                'Low volume of information provided\n' +
                'Lack of motivation\n' +
                'Low amount of investment intended\n' +
                '\n' +
                'Due to high number of applications, unfortunately we are unable to provide more detailed feedback. However, you still have the chance to re-apply to be the Investor of the Future.\n' +
                '\n' +
                'Thank you and wish you good luck.';
              this.hideForm = false ;
              this.buyForm = false;
            } else if (obj === 'We are unable to find Transaction please check later') {
              this.hideForm = true;
              this.buyForm = true;
              if (this.buyForm) {
                this.activedWallets = respons['addresses'];
                this.activedWallet = respons['addresses']['ethereum'];
                this.expireDate = respons['expires_at'];
              }
            } else if (obj === 'Your transaction is waiting confirmation, please check again in a while') {
              this.hideForm = true;
              this.buyForm = false;
              this.pendingRequest = 'Your transaction is waiting confirmation, please check again in a while';
            } else if(obj === 'Payment has been expired') {
              this.expiredDateMessage = obj;
              this.hideForm = true ;
              this.generateForm = true;
              this.oneMessageGenerate = true;
            }
          });
        } else if (respons['success'] && respons['message']) {
          if (respons['message'] === 'Generate wallet to receive data' && respons['state'] === 'generate') {
            this.hideForm = true;
            this.generateForm = true;
            this.generateMessage = respons['message'];
          } else if (respons['state'] === 'confirmed') {
            this.hideForm = true;
            this.generateForm = false;
            this.confirmedMessage = respons['message'];
          } else if (respons['success'] && respons['message'] === 'applicable') {
            this.hideForm = false;
          }
        } else {
          this.hideForm = false;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
