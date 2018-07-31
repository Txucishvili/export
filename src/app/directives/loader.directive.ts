import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {Subject} from 'rxjs';

@Directive({
  selector: '[isloader]'
})

export class LoaderDirective implements OnInit {
  constructor(
    private renderer: Renderer2,
    private element: ElementRef
  ) {
  }

  @Input('isloader') value: any;

  ngOnInit() {
    console.log(this.value);
    this.renderer.addClass(this.element.nativeElement, 'isLoading');
  }

}
