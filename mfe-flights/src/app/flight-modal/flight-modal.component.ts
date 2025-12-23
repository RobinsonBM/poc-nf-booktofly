import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flight } from '../models/flight.model';

@Component({
  selector: 'app-flight-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-modal.component.html',
  styleUrls: ['./flight-modal.component.less']
})
export class FlightModalComponent {
  @Input() flight: Flight | null = null;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
