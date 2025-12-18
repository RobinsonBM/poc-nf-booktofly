import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

interface Hotel {
  id: number;
  name: string;
  city: string;
  price: number;
  rating: number;
  image: string;
}

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.less',
})
export class HotelsComponent {
  private store = inject(Store); 
  
  userName$ = this.store.select((state: any) => state.user?.name);
  userEmail$ = this.store.select((state: any) => state.user?.email);
  
  hotels: Hotel[] = [
    {
      id: 1,
      name: 'Hotel Casa San Agustín',
      city: 'Cartagena',
      price: 580000,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400'
    },
    {
      id: 2,
      name: 'Four Seasons Casa Medina',
      city: 'Bogotá',
      price: 720000,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
    },
    {
      id: 3,
      name: 'Hotel Estelar Miraflores',
      city: 'Medellín',
      price: 450000,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400'
    },
    {
      id: 4,
      name: 'GHL Hotel Neiva',
      city: 'Neiva',
      price: 280000,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400'
    },
    {
      id: 5,
      name: 'Dann Carlton Cali',
      city: 'Cali',
      price: 350000,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400'
    },
    {
      id: 6,
      name: 'Hotel Charleston Santa Teresa',
      city: 'Cartagena',
      price: 890000,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400'
    }
  ];
}
