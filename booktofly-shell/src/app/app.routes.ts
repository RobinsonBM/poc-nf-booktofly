import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'hotels',
    loadComponent: () =>
      loadRemoteModule({
        remoteName: 'mfe-hotels',
        exposedModule: './Component'
      }).then((m) => m.AppComponent)
  }
];
