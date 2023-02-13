import { Directive, OnInit, Renderer2, ElementRef } from '@angular/core';

@Directive({ selector: '[enbolden]' })
export class BoldWeightDirective implements OnInit {
  constructor(private appliedOn: ElementRef ,private appRenderer: Renderer2) {}
    ngOnInit(): void {
        this.appRenderer.setStyle(this.appliedOn, 'font-weight', 'bold');
    }  
}
