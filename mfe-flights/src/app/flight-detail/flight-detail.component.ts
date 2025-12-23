import { Component, computed, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlightService } from '../services/flight.service';
import { Flight } from '../models/flight.model';

@Component({
  selector: 'app-flight-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.less']
})
export class FlightDetailComponent implements OnInit {
  flight = signal<Flight | undefined>(undefined);
  selectedSeats = signal<number>(1);
  totalPrice = computed(() => {
    const flightData = this.flight();
    return flightData ? flightData.price * this.selectedSeats() : 0;
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const flightData = this.flightService.getFlightById(id);
      this.flight.set(flightData);
      
      if (!flightData) {
        this.router.navigate(['/flights/search']);
      }
    }
  }

  increaseSeats(): void {
    const currentFlight = this.flight();
    if (currentFlight && this.selectedSeats() < currentFlight.availableSeats) {
      this.selectedSeats.update(seats => seats + 1);
    }
  }

  decreaseSeats(): void {
    if (this.selectedSeats() > 1) {
      this.selectedSeats.update(seats => seats - 1);
    }
  }

  bookFlight(): void {
    alert(`¡Reserva confirmada! ${this.selectedSeats()} asiento(s) por ${this.totalPrice()}€`);
  }

  backToList(): void {
    this.router.navigate(['/flights/list']);
  }
}
