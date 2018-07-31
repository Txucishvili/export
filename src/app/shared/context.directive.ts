import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appOpenDropDown]'
})
export class DropDownDirective {

  constructor() {}

  @HostBinding('class.active') isOpen = false;
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
