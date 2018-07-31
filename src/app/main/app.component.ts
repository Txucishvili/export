import {Component, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserdataService} from '../_services/userdata.service';
import {UserService} from '../_services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation
    .None
})
export class AppComponent {
  title = 'app';

  constructor(
    private userDataService: UserdataService,
    private userService: UserService
  ) {
    // this.userService.getUser().then(
    //   respons => {
    //     console.log('hello');
    //     this.userDataService.userDetailsSource.next(respons);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );

  }

  closeBeta: any = true;

}
