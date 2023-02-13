import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[embolden]',
})
export class MakeBoldDirective implements OnInit {
  constructor(private appliedOn: ElementRef, private renderer:Renderer2) {}
  ngOnInit() {
    this.renderer.setStyle(this.appliedOn.nativeElement, 'font-weight', 'bold');
  }
}
