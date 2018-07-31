import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.scss']
})
export class HeadlineComponent implements OnInit {

  constructor( ) {
  }

  @Output() OpenMenu = new EventEmitter();


  openNavMenu(event) {
    this.OpenMenu.emit( true);
  }
  ngOnInit() {
  }

}
