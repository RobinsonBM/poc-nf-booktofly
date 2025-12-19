import { Routes } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'flights',
    pathMatch: 'full'
  },
  {
    path: 'flights',
    children: [
      {
        path: '',
        component: FlightSearchComponent
      },
      {
        path: 'search',
        component: FlightSearchComponent
      },
      {
        path: 'list',
        component: FlightListComponent
      },
      {
        path: 'detail/:id',
        component: FlightDetailComponent
      }
    ]
  }
];
