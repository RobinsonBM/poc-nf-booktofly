import { Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.less',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class App {
  protected readonly title = signal('mfe-flights');
}
