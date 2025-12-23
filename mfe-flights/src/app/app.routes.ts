import { Routes } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
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
        loadComponent: () => import('./flight-search/flight-search.component').then(m => m.FlightSearchComponent)
      },
      {
        path: 'search',
        component: FlightSearchComponent
      },
      {
        path: 'list',
        loadComponent: () => import('./flight-list/flight-list.component').then(m => m.FlightListComponent)
      },
      {
        path: 'detail/:id',
        component: FlightDetailComponent
      }
    ]
  }
];
