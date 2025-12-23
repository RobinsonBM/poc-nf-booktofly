import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { HomeComponent } from './home/home.component';
import { startsWith } from './utils/route-matchers';
import { WrapperComponent } from './wrapper/wrapper.component';
import { WrapperConfig } from './wrapper/wrapper-config';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  // Hotels: Lazy Routes (patrón estándar - maneja sus propias rutas)
  {
    path: 'hotels',
    loadChildren: () =>
      loadRemoteModule({
        remoteName: 'mfe-hotels',
        exposedModule: './routes'
      }).then((m) => m.routes)
  },
  // Flights: Web Component (wrapper genérico)
  {
    matcher: startsWith('flights'),
    component: WrapperComponent,
    data: {
      config: {
        remoteName: 'mfe-flights',
        exposedModule: './web-component',
        elementName: 'mfe-flights-element'
      } as WrapperConfig
    }
  }
];
