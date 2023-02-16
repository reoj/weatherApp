import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';


@Directive({
  selector: '[data-strip]'
})
export class DataStripDirective {

  constructor(
    private appliedOn: ElementRef, 
    private renderer:Renderer2
    ) {}
  ngOnInit() {
    this.renderer.setStyle(this.appliedOn.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.appliedOn.nativeElement, 'align-items', 'center');
    this.renderer.setStyle(this.appliedOn.nativeElement, 'gap', '1rem');
    this.renderer.setStyle(this.appliedOn.nativeElement, 'flex-direction', 'row');
  }
}
