import { createApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { createCustomElement } from '@angular/elements';
import { App } from './app/app';
import { Router } from '@angular/router';

(async () => {
  try {
    const app = await createApplication(appConfig);
    
    // Inicializar el router
    const router = app.injector.get(Router);
    router.initialNavigation();
    
    const flightsElement = createCustomElement(App, { injector: app.injector });

    const elementName = 'mfe-flights-element';
    if (!customElements.get(elementName)) {
      customElements.define(elementName, flightsElement);
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
})();
