import { createApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { createCustomElement } from '@angular/elements';
import { App } from './app/app';

(async () => {
  try {
    const app = await createApplication(appConfig);

    const flightsElement = createCustomElement(App, { injector: app.injector });

    const elementName = 'mfe-flights-element';
    if (!customElements.get(elementName)) {
      customElements.define(elementName, flightsElement);
      console.log('✅ Web Component mfe-flights-element registrado con éxito');
    }
  } catch (error) {
    console.error('❌ Error al registrar el Web Component mfe-flights-element:', error);
  }
})();
