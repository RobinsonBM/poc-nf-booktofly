import { loadRemoteModule } from '@angular-architects/native-federation';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-flights-wrapper',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<mfe-flights-element></mfe-flights-element>`
})
export class FlightsWrapperComponent implements OnInit {
  async ngOnInit() {
    await loadRemoteModule({
      remoteName: 'mfe-flights',
      exposedModule: './web-component'
    });
    console.log('✅ MFE Flights cargado correctamente');
  }
}
