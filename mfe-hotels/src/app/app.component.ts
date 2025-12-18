import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'mfe-hotels';
  private store = inject(Store);
  
  userName$ = this.store.select((state: any) => state.user?.name);
  userEmail$ = this.store.select((state: any) => state.user?.email);
}
