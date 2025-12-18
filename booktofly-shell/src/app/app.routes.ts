import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { HomeComponent } from './home/home.component';
import { FlightsWrapperComponent } from './flights-wrapper/flights-wrapper.component';

export const routes: Routes = [
    {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'hotels',
    loadChildren: () =>
      loadRemoteModule({
        remoteName: 'mfe-hotels',
        exposedModule: './routes'
      }).then((m) => m.routes)
  },
  {
    path: 'flights',
    component: FlightsWrapperComponent
  }
];
