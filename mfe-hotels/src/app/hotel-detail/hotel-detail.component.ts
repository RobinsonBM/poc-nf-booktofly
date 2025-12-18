import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface Hotel {
  id: number;
  name: string;
  city: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  amenities: string[];
}

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hotel-detail.component.html',
  styleUrl: './hotel-detail.component.less'
})
export class HotelDetailComponent implements OnInit {
  hotel?: Hotel;

  private hotels: Hotel[] = [
    {
      id: 1,
      name: 'Hotel Casa San Agustín',
      city: 'Cartagena',
      price: 580000,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      description: 'Ubicado en el corazón del centro histórico de Cartagena, este hotel boutique ofrece una experiencia única combinando arquitectura colonial con comodidades modernas. Disfruta de sus patios interiores, piscina en la azotea y restaurante gourmet.',
      amenities: ['WiFi gratuito', 'Piscina', 'Spa', 'Restaurante', 'Bar', 'Gimnasio', 'Aire acondicionado', 'Servicio a la habitación', 'Estacionamiento', 'Desayuno incluido']
    },
    {
      id: 2,
      name: 'Four Seasons Casa Medina',
      city: 'Bogotá',
      price: 720000,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      description: 'Hotel de lujo en el exclusivo barrio de Chapinero. Combina elegancia clásica con servicio de clase mundial. Ideal para viajeros de negocios y turistas que buscan lo mejor de Bogotá.',
      amenities: ['WiFi gratuito', 'Spa de lujo', 'Restaurante gourmet', 'Bar', 'Gimnasio premium', 'Servicio de conserjería', 'Centro de negocios', 'Salas de reuniones', 'Estacionamiento valet', 'Desayuno buffet']
    },
    {
      id: 3,
      name: 'Hotel Estelar Miraflores',
      city: 'Medellín',
      price: 450000,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
      description: 'Hotel moderno en El Poblado con vistas espectaculares de la ciudad. Perfecto para disfrutar de la vibrante vida nocturna y cultural de Medellín, con fácil acceso a restaurantes y centros comerciales.',
      amenities: ['WiFi gratuito', 'Piscina panorámica', 'Restaurante', 'Bar en azotea', 'Gimnasio', 'Sauna', 'Estacionamiento', 'Desayuno continental', 'Terraza']
    },
    {
      id: 4,
      name: 'GHL Hotel Neiva',
      city: 'Neiva',
      price: 280000,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      description: 'Hotel confortable en el centro de Neiva, capital del Huila. Excelente base para explorar el desierto de la Tatacoa y disfrutar de la gastronomía local. Ofrece habitaciones amplias y servicio atento.',
      amenities: ['WiFi gratuito', 'Piscina', 'Restaurante local', 'Bar', 'Aire acondicionado', 'Tours organizados', 'Estacionamiento gratuito', 'Desayuno incluido']
    },
    {
      id: 5,
      name: 'Dann Carlton Cali',
      city: 'Cali',
      price: 350000,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      description: 'Hotel emblemático en el norte de Cali, conocido por su elegancia y servicios completos. Cerca de centros comerciales y zonas empresariales. Perfecto para viajes de negocios y placer.',
      amenities: ['WiFi gratuito', 'Piscina exterior', 'Restaurante buffet', 'Bar lounge', 'Gimnasio', 'Centro de negocios', 'Salas de eventos', 'Estacionamiento', 'Desayuno variado']
    },
    {
      id: 6,
      name: 'Hotel Charleston Santa Teresa',
      city: 'Cartagena',
      price: 890000,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      description: 'Hotel de ultra lujo en un convento del siglo XVII restaurado. Ubicación privilegiada en el casco histórico con vistas a la bahía. Ofrece una experiencia inolvidable con servicio personalizado y detalles exclusivos.',
      amenities: ['WiFi gratuito', 'Piscina infinity', 'Spa de lujo', 'Restaurante estrella Michelin', 'Bar premium', 'Gimnasio', 'Mayordomo privado', 'Helipuerto', 'Estacionamiento valet', 'Desayuno gourmet', 'Biblioteca', 'Sala de cine']
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.hotel = this.hotels.find(h => h.id === id);
    });
  }
}
