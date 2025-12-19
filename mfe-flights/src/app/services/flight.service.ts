import { Injectable, signal } from '@angular/core';
import { Flight, FlightSearchCriteria } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private flights = signal<Flight[]>([
    {
      id: '1',
      flightNumber: 'AA101',
      airline: 'American Airlines',
      origin: 'Madrid',
      destination: 'Barcelona',
      departureTime: '08:00',
      arrivalTime: '09:30',
      duration: '1h 30m',
      price: 120,
      availableSeats: 45,
      class: 'economy'
    },
    {
      id: '2',
      flightNumber: 'IB202',
      airline: 'Iberia',
      origin: 'Madrid',
      destination: 'Barcelona',
      departureTime: '10:00',
      arrivalTime: '11:30',
      duration: '1h 30m',
      price: 150,
      availableSeats: 30,
      class: 'economy'
    },
    {
      id: '3',
      flightNumber: 'VY303',
      airline: 'Vueling',
      origin: 'Madrid',
      destination: 'Barcelona',
      departureTime: '14:00',
      arrivalTime: '15:30',
      duration: '1h 30m',
      price: 95,
      availableSeats: 60,
      class: 'economy'
    },
    {
      id: '4',
      flightNumber: 'UX404',
      airline: 'Air Europa',
      origin: 'Madrid',
      destination: 'Barcelona',
      departureTime: '18:00',
      arrivalTime: '19:30',
      duration: '1h 30m',
      price: 110,
      availableSeats: 25,
      class: 'economy'
    },
    {
      id: '5',
      flightNumber: 'AA201',
      airline: 'American Airlines',
      origin: 'Barcelona',
      destination: 'Madrid',
      departureTime: '09:00',
      arrivalTime: '10:30',
      duration: '1h 30m',
      price: 125,
      availableSeats: 40,
      class: 'economy'
    }
  ]);

  private searchResults = signal<Flight[]>([]);
  
  readonly allFlights = this.flights.asReadonly();
  readonly results = this.searchResults.asReadonly();

  searchFlights(criteria: FlightSearchCriteria): void {
    const filtered = this.flights().filter(flight => {
      const matchOrigin = !criteria.origin || 
        flight.origin.toLowerCase().includes(criteria.origin.toLowerCase());
      const matchDestination = !criteria.destination || 
        flight.destination.toLowerCase().includes(criteria.destination.toLowerCase());
      const matchClass = !criteria.class || flight.class === criteria.class;
      
      return matchOrigin && matchDestination && matchClass;
    });

    this.searchResults.set(filtered);
  }

  getFlightById(id: string): Flight | undefined {
    return this.flights().find(flight => flight.id === id);
  }

  clearSearch(): void {
    this.searchResults.set([]);
  }
}
