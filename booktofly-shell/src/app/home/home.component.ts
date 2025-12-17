import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { setUser, clearUser } from '../store/user.actions';
import { selectUserName, selectUserEmail } from '../store/user.selectors';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {
  private store = inject(Store);
  
  userName$ = this.store.select(selectUserName);
  userEmail$ = this.store.select(selectUserEmail);

  setUser() {
    this.store.dispatch(setUser({ 
      name: 'Juan Pérez', 
      email: 'juan@example.com' 
    }));
  }

  clearUser() {
    this.store.dispatch(clearUser());
  }
}
