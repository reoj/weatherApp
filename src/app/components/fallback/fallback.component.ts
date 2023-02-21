import { Component } from '@angular/core';

@Component({
  selector: 'app-fallback',
  templateUrl: './fallback.component.html',
  styleUrls: ['./fallback.component.css'],
  host: {
    class: 'parent-container',
  },
})
export class FallbackComponent {
  public code = '404';
  public message = 'Page not found';

  constructor( ) { }

}
