import {Injectable, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class ModalService implements OnInit {

  constructor() {
  }

  public modalSource = new Subject();
  modalConfig = this.modalSource.asObservable();

  open(insideText) {
    const view = insideText.cloneNode(true);
    const modalConfig = {
      open: true,
      html: view
    };
    this.modalSource.next(modalConfig);
  }

  close() {
    const modalConfig = {
      open: false,
      html: '<p>No Content</p>'
    };
    this.modalSource.next(modalConfig);
  }

  get() {
  }

  ngOnInit() {
  }
}
