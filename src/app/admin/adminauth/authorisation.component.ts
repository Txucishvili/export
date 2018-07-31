import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-authorisation',
  templateUrl: './authorisation.component.html',
  styleUrls: ['./authorisation.component.scss']
})
export class AdminAuthorisationComponent implements OnInit {


  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    this.isSignUpPage = this.router.url;
  }
  isSignUpPage: any;

  ngOnInit() {
  }
}
