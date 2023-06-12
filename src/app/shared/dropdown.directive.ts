import {Directive, ElementRef, HostBinding, HostListener} from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen = false;

  // @HostListener('click') toggleOpen(){
  //   this.isOpen = !this.isOpen;
  // }

  // this snippet will help, to click any where on the screen to opo out the dropdown
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}



