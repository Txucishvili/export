import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../../_services/modal.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private modalService: ModalService
  ) { }

  openModal(inside) {
    // console.log(inside);
    this.modalService.open(inside);
  }

  ngOnInit() {
  }

}
