import { Component, signal, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightService } from '../services/flight.service';
import { FlightSearchCriteria } from '../models/flight.model';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.less'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class FlightSearchComponent {
  searchCriteria = signal<FlightSearchCriteria>({
    origin: '',
    destination: '',
    departureDate: '',
    passengers: 1,
    class: 'economy'
  });

  constructor(
    private flightService: FlightService,
    private router: Router
  ) {}

  onSearch(): void {
    this.flightService.searchFlights(this.searchCriteria());
    this.router.navigate(['/flights/list']);
  }

  updateOrigin(value: string): void {
    this.searchCriteria.update(criteria => ({ ...criteria, origin: value }));
  }

  updateDestination(value: string): void {
    this.searchCriteria.update(criteria => ({ ...criteria, destination: value }));
  }

  updateDepartureDate(value: string): void {
    this.searchCriteria.update(criteria => ({ ...criteria, departureDate: value }));
  }

  updatePassengers(value: number): void {
    this.searchCriteria.update(criteria => ({ ...criteria, passengers: value }));
  }

  updateClass(value: 'economy' | 'business' | 'first'): void {
    this.searchCriteria.update(criteria => ({ ...criteria, class: value }));
  }
}
