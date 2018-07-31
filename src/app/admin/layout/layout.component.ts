import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NavigationComponent} from './navigation/navigation.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  @ViewChild(NavigationComponent) navigation;

  @Input() navigationIsOpen: any = false;

  openNavigation(event) {
    if (event) {
      this.navigationIsOpen = true;
    } else {
      this.navigationIsOpen = false;
    }
    this.navigation.navigationOpenTo = this.navigationIsOpen;
  }

  closeNavigation(event) {
    if (event.navigation) {
      this.navigationIsOpen = true;
    } else {
      this.navigationIsOpen = false;
    }
    console.log('close');
    console.log(this.navigationIsOpen);
  }

}
