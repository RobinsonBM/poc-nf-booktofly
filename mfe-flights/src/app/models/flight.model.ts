export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  class: 'economy' | 'business' | 'first';
}

export interface FlightSearchCriteria {
  origin: string;
  destination: string;
  departureDate: string;
  passengers: number;
  class: 'economy' | 'business' | 'first';
}
