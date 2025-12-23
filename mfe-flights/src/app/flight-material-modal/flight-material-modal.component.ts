import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Flight } from '../models/flight.model';

@Component({
  selector: 'app-flight-material-modal',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule, 
    MatButtonModule, 
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './flight-material-modal.component.html',
  styleUrls: ['./flight-material-modal.component.less']
  // Material no funciona con ShadowDom - usa Emulated por defecto
})
export class FlightMaterialModalComponent {
  constructor(
    public dialogRef: MatDialogRef<FlightMaterialModalComponent>,
    @Inject(MAT_DIALOG_DATA) public flight: Flight
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
