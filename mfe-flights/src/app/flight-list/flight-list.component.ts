import { Component, computed, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.less'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class FlightListComponent {
  flights = computed(() => this.flightService.results());
  hasResults = computed(() => this.flights().length > 0);

  constructor(
    private flightService: FlightService,
    private router: Router
  ) {}

  viewDetails(flightId: string): void {
    this.router.navigate(['/flights/detail', flightId]);
  }

  backToSearch(): void {
    this.flightService.clearSearch();
    this.router.navigate(['/flights/search']);
  }
}
