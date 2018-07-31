import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {UserService} from './user.service';
import {Subject} from 'rxjs';

@Injectable()
export class UserdataService implements OnInit {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private userService: UserService
  ) {
  }

  usersInfo: any;

  public userDetailsSource = new Subject<any>();
  userDetails = this.userDetailsSource.asObservable();


  get getUserDetails() {
    console.log('hited - getUserDetails');
    this.userService.getUser().then(
      respons => {
        this.userDetailsSource.next(respons);
      },
      error => {
        console.log(error);
      }
    );
    return this.userDetails;
  }

  ngOnInit() {
  }


}
