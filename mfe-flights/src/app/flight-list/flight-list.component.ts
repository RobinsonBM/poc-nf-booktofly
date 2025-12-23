import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FlightService } from '../services/flight.service';
import { FlightModalComponent } from '../flight-modal/flight-modal.component';
import { FlightMaterialModalComponent } from '../flight-material-modal/flight-material-modal.component';
import { Flight } from '../models/flight.model';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [CommonModule, FlightModalComponent],
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.less']
})
export class FlightListComponent {
  flights = computed(() => this.flightService.results());
  hasResults = computed(() => this.flights().length > 0);
  
  selectedFlight = signal<Flight | null>(null);
  isModalOpen = signal(false);

  constructor(
    private flightService: FlightService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  viewDetails(flightId: string): void {
    this.router.navigate(['/flights/detail', flightId]);
  }

  backToSearch(): void {
    this.flightService.clearSearch();
    this.router.navigate(['/flights/search']);
  }

  openModal(flight: Flight): void {
    this.selectedFlight.set(flight);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedFlight.set(null);
  }

  openMaterialModal(flight: Flight): void {
    this.dialog.open(FlightMaterialModalComponent, {
      data: flight,
      width: '600px',
      maxWidth: '90vw'
    });
  }
}
