import { Routes } from '@angular/router';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HotelsComponent
  },
  {
    path: 'detail/:id',
    component: HotelDetailComponent
  }
];
