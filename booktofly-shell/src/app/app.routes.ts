import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { HomeComponent } from './home/home.component';
import { FlightsWrapperComponent } from './flights-wrapper/flights-wrapper.component';
import { startsWith } from './utils/route-matchers';

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
    matcher: startsWith('flights'),
    component: FlightsWrapperComponent,
    data: {
      config: {
        remoteName: 'mfe-flights',
        exposedModule: './web-component',
        elementName: 'mfe-flights-element'
      }
    }
  }
];
