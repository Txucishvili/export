import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {isCombinedNodeFlagSet} from 'tslint';
import {UserService} from '../../../_services/user.service';
import {UserdataService} from '../../../_services/userdata.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    private userService: UserService,
    private userDataService: UserdataService
  ) {
  }

  @Output() navigationOpen = new EventEmitter();
  navigationOpenTo: any = false;

  isAdminStatus: any;

  usersToken = [];
  showToken = {
    type: '',
    value: ''
  };

  closeNavigation() {
    this.navigationOpenTo = false;
    this.navigationOpen.emit(false);
  }
  closeNavigationLink() {
    this.navigationOpenTo = false;
  }

  showCurrency(type) {
    if (type === 'tokens') {
      this.showToken = {
        value: this.usersToken['tokens'],
        type: 'tokens'
      };
    } else if (type === 'eth') {
      this.showToken = {
        value: this.usersToken['eth'],
        type: 'eth'
      };
    } else if (type === 'usd') {
      this.showToken = {
        value: this.usersToken['usd'],
        type: 'usd'
      };
    }
  }


  ngOnInit() {
    this.userDataService.userDetails.subscribe(
      respons => {
        this.isAdminStatus = respons['isAdminUser'];
        this.showToken = {
          value: respons['tokens'],
          type: 'tokens'
        };
        this.usersToken['tokens'] = respons['tokens'];
        this.usersToken['eth'] = respons['eth'];
        this.usersToken['usd'] = respons['usd'];
      }
    );
  }

}
