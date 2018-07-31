import {Component, ElementRef, OnInit} from '@angular/core';
import {NationalityService} from '../../nationality.service';
import {CountriesService} from '../../countries.service';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../../_services/authentication.service';
import {NotificationService} from '../../../_services/notification.service';
import {AlertsService} from '../../alerts.service';
import {UserService} from '../../../_services/user.service';

@Component({
  selector: 'app-affiliatetwo',
  templateUrl: './affiliatetwo.component.html',
  styleUrls: ['./affiliatetwo.component.scss']
})
export class AffiliatetwoComponent implements OnInit {

  constructor(
    private nationality: NationalityService,
    private country: CountriesService,
    private formBuilder: FormBuilder,
    private elref: ElementRef,
    private authService: AuthenticationService,
    private http: HttpClient,
    private notify: NotificationService,
    private alertify: AlertsService,
    private userService: UserService
  ) {
  }

  nationalits: any;
  contrielist: any;

  processContainer: any = true;
  isBigLoading: any = false;


  //form
  questionForm: FormGroup;
  questionFormControl: any;
  eduLevelBase: any = [
    {
      value: 'High School Diploma',
      selected: true
    },
    {
      value: 'Undergraduate',
      selected: false
    },
    {
      value: 'Graduate',
      selected: false
    },
    {
      value: 'Post-Graduate',
      selected: false
    }
  ];
  eduLevel: any;
  userDetails: any;

  // occupation
  occupationList: any = [
    {value: 'Employed', check: false},
    {value: 'Self-employed', check: false},
    {value: 'Unemployed', check: false},
    {value: 'Student', check: false}
  ];

  myDateValue: Date;
  requstFormView: any;
  responsMessage: any;
  getData: any;

  questionChange(string, question) {
    this.questionForm.controls.data['controls'][question].setValue(string);
  }

  questionChangeInput(string, question) {
    if (string) {
      this.questionForm.controls.data['controls'][question].setValue(string);
      this.eduLevel = [
        {
          value: 'High School Diploma',
          selected: false
        },
        {
          value: 'Undergraduate',
          selected: false
        },
        {
          value: 'Graduate',
          selected: false
        },
        {
          value: 'Post-Graduate',
          selected: false
        }
      ];
    }
  }

  questionSwitch(ebb, question) {
    ebb.check = !ebb.check;
    const newObj = this.occupationList.filter(obj => {
      if (obj['check']) {
        const objN = obj['value'];
        return objN;
      }
    });
    const filtered = [];
    newObj.forEach(obj => {
      filtered.push(obj['value']);
    });

    this.questionForm.controls.data['controls'][question].setValue(filtered.toString());

  }

  onDateChange(newDate: Date) {
    console.log(newDate);
  }

  initQuestionForm() {
    this.myDateValue = new Date();

    this.questionForm = new FormGroup({
      data: this.formBuilder.group({
        nationality: ['', [Validators.required]],
        countryOfResidence: ['', [Validators.required]],
        dateOfBirth: [new Date(), [Validators.required]],
        levelOfEducation: ['', [Validators.required]],
        fieldOfEducation: ['', []],
        occupation: [[], [Validators.required]],
        question1: ['', [Validators.maxLength(500)]],
        question2: ['', [Validators.required, Validators.maxLength(500)]],
        question3: ['', [Validators.required, Validators.maxLength(500)]],
        question4: ['', [Validators.required, Validators.maxLength(3000)]],
        question5: ['', [Validators.required, Validators.maxLength(3000)]],
        question6: ['', [Validators.required, Validators.maxLength(3000)]],
        sociallink: ['', [Validators.required]],

      })
    });
    this.questionFormControl = this.questionForm['controls'].data['controls'];
  }

  submitForm() {
    console.log(this.questionForm.valid);
    this.http.post(this.authService.API_BASE_URL + '/dash/ambassador', this.questionForm['value'].data)
      .toPromise()
      .then(
        respons => {
          if (respons['errors']) {
            respons['errors'].forEach(obj => {
              this.notify.push('error', true, 'Error', obj);
              this.alertify.error(true, obj);
            });
          } else if (respons['success']) {
            this.requstFormView = false;
            this.responsMessage = {
              status: 'success',
              message: 'Thank you for submitting your application! We received your request. Keplertek team will review your application in less than 96 hours and provide you with an update via email.'
            };
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  copyToClipboard(wallet) {
    wallet.select();
    document.execCommand('copy');
  }

  ngOnInit() {
    this.isBigLoading = true;
    this.userService.getUser().then(
      respons => {
        this.userDetails = respons;
      },
      error => {
        console.log(error);
      }
    );
    this.nationalits = this.nationality.nations;
    this.contrielist = this.country.countries;
    this.eduLevel = this.eduLevelBase;
    this.initQuestionForm();
    this.http.get(this.authService.API_BASE_URL + '/dash/ambassador')
      .toPromise()
      .then(
        respons => {
          this.isBigLoading = false;

          if (respons['errors']) {
            respons['errors'].forEach(obj => {
              if (obj === 'Your request is pending') {
                this.requstFormView = false;
                this.responsMessage = {
                  status: 'danger',
                  message: 'Thank you for submitting your application! We received your request. Keplertek team will review your application in less than 96 hours and provide you with an update via email.'
                };
              }
              if (obj === 'Your request has been rejected') {
                this.requstFormView = false;
                this.processContainer = true;
                this.responsMessage = {
                  status: 'error',
                  message: obj
                };
              }
              if (obj === 'You have to verify KYC before accessing this page') {
                this.requstFormView = false;
                this.responsMessage = {
                  status: 'error',
                  message: obj
                };
              }
              if (obj === 'Your KYC verification request is pending') {
                this.requstFormView = false;
                this.responsMessage = {
                  status: 'error',
                  message: obj
                };
              }
            });
          } else if (respons['success'] && respons['message'] === 'applicable') {
            this.requstFormView = true;
            this.responsMessage = false;
            this.processContainer = true;
          } else if (respons['message'] && respons['message'] === 'Your ambassador request has been accepted' && respons['data']) {
            this.requstFormView = false;
            this.processContainer = false;
            this.responsMessage = {
              status: 'success',
              message: 'Accepted'
            };
            this.getData = respons['data'];
          }
        },
        error => {
          this.isBigLoading = false;
          console.log(error);
        }
      );
  }

}
