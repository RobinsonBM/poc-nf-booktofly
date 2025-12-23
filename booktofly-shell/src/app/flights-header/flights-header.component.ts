import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectUser } from '../store/user.selectors';

@Component({
  selector: 'app-flights-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flights-header.component.html',
  styleUrls: ['./flights-header.component.less']
})
export class FlightsHeaderComponent {
  user$;

  constructor(private store: Store) {
    this.user$ = this.store.select(selectUser);
  }
}
