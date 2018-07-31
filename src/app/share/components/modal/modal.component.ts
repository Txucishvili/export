import {
  Component,
  ElementRef, OnDestroy,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import {ModalService} from '../../../_services/modal.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {

  constructor(
    private modalService: ModalService,
    private sanitizer: DomSanitizer
  ) {
  }

  // @ViewChildren('insideContent') insideContent: QueryList<ElementRef>;

  modalIsOpen: any = false;
  item = HTMLElement;

  close() {
    this.modalService.close();
  }

  ngOnInit() {
    this.modalService.modalConfig.subscribe(
      value => {
        if (value['open']) {
          this.modalIsOpen = value['open'];
          this.item = value['html'];
        } else {
          this.modalIsOpen = value['open'];
          setTimeout(() => {
            this.item = value['html'];
          }, 1000);
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.modalIsOpen = false;
      }
    );
  }

  ngOnDestroy() {
    this.modalService.modalSource.unsubscribe();
  }

}
