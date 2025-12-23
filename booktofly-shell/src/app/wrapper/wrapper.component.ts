import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { defaultWrapperConfig, WrapperConfig } from './wrapper-config';
import { FlightsHeaderComponent } from '../flights-header/flights-header.component';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [FlightsHeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <app-flights-header></app-flights-header>
    <div #mfeContainer></div>
  `,
  styles: [':host { display: block; }']
})
export class WrapperComponent implements AfterViewInit {
  @ViewChild('mfeContainer', { static: false }) mfeContainer!: ElementRef;
  private readonly route = inject(ActivatedRoute);

  async ngAfterViewInit(): Promise<void> {
    const config: WrapperConfig = this.route.snapshot.data['config'] ?? defaultWrapperConfig;
    const { remoteName, exposedModule, elementName } = config;

    await loadRemoteModule({ remoteName, exposedModule });
    
    const webComponent = document.createElement(elementName);
    this.mfeContainer.nativeElement.appendChild(webComponent);
    
    console.log(`✅ Web Component ${remoteName} cargado correctamente`);
  }
}

