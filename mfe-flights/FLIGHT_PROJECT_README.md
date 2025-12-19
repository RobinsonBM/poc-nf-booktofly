# 🚀 Mini Proyecto de Vuelos - MFE Flights

## 📋 Descripción

Sistema completo de reserva de vuelos con arquitectura de microfrontend usando Angular 19+ con señales, lazy loading y rutas completamente funcionales.

## ✨ Características

### Componentes Implementados

1. **Búsqueda de Vuelos** (`/flights/search`)
   - Formulario de búsqueda con origen, destino, fecha, pasajeros y clase
   - Validación de campos
   - Navegación automática a resultados

2. **Listado de Vuelos** (`/flights/list`)
   - Visualización de resultados de búsqueda
   - Cards con información detallada de cada vuelo
   - Botones de acción para ver detalles
   - Mensaje cuando no hay resultados

3. **Detalle de Vuelo** (`/flights/detail/:id`)
   - Información completa del vuelo seleccionado
   - Selector de cantidad de asientos
   - Cálculo dinámico del precio total
   - Servicios incluidos (amenities)
   - Botón de reserva

### Tecnologías Utilizadas

- **Angular 19+** con Signals
- **Standalone Components**
- **Router** con lazy loading
- **FormsModule** para formularios
- **LESS** para estilos
- **TypeScript** para type safety

## 🗂️ Estructura del Proyecto

```
mfe-flights/src/app/
├── models/
│   └── flight.model.ts          # Interfaces de Flight y FlightSearchCriteria
├── services/
│   └── flight.service.ts        # Servicio con datos y lógica de búsqueda
├── flight-search/
│   ├── flight-search.component.ts
│   ├── flight-search.component.html
│   └── flight-search.component.less
├── flight-list/
│   ├── flight-list.component.ts
│   ├── flight-list.component.html
│   └── flight-list.component.less
├── flight-detail/
│   ├── flight-detail.component.ts
│   ├── flight-detail.component.html
│   └── flight-detail.component.less
├── app.ts                       # Componente raíz
├── app.html                     # Template principal
├── app.less                     # Estilos globales del app
├── app.routes.ts                # Configuración de rutas
└── app.config.ts                # Configuración de la aplicación
```

## 🎯 Rutas Disponibles

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Redirect | Redirige a `/flights/search` |
| `/flights/search` | FlightSearchComponent | Formulario de búsqueda |
| `/flights/list` | FlightListComponent | Listado de resultados |
| `/flights/detail/:id` | FlightDetailComponent | Detalles del vuelo |

## 🔄 Flujo de Navegación

1. Usuario llega a la página principal → Redirigido a `/flights/search`
2. Usuario completa formulario y hace clic en "Buscar Vuelos"
3. Sistema filtra vuelos y navega a `/flights/list`
4. Usuario ve resultados y hace clic en "Ver Detalles"
5. Sistema navega a `/flights/detail/:id`
6. Usuario selecciona asientos y hace clic en "Reservar Ahora"

## 💾 Datos de Prueba

El servicio incluye 5 vuelos de ejemplo:

- Madrid → Barcelona (4 vuelos)
- Barcelona → Madrid (1 vuelo)

Con diferentes aerolíneas: American Airlines, Iberia, Vueling, Air Europa

## 🚀 Cómo Usar

### Desarrollo

```bash
# Navegar al directorio del proyecto
cd mfe-flights

# Instalar dependencias (si es necesario)
npm install

# Iniciar servidor de desarrollo
npm start

# La aplicación estará disponible en http://localhost:4200
```

### Probar el Sistema

1. Abrir http://localhost:4200
2. Completar el formulario de búsqueda:
   - Origen: "Madrid"
   - Destino: "Barcelona"
   - Fecha: Cualquier fecha
   - Pasajeros: 1-9
   - Clase: Económica/Business/Primera Clase
3. Hacer clic en "Buscar Vuelos"
4. Seleccionar un vuelo de los resultados
5. Modificar cantidad de asientos
6. Hacer clic en "Reservar Ahora"

## 🎨 Características de UI/UX

- Diseño moderno con gradientes
- Tarjetas con efectos hover
- Animaciones suaves
- Responsive design
- Iconos emoji para mejor visual
- Colores consistentes
- Feedback visual en interacciones

## 🔧 Características Técnicas

- **Signals**: Estado reactivo con Angular Signals
- **Lazy Loading**: Componentes cargados bajo demanda
- **Type Safety**: TypeScript en toda la aplicación
- **Computed Values**: Cálculos reactivos automáticos
- **Standalone**: Sin NgModules, arquitectura moderna
- **Router**: Navegación programática y declarativa

## 📝 Próximas Mejoras

- [ ] Integración con API real
- [ ] Filtros avanzados
- [ ] Ordenamiento de resultados
- [ ] Persistencia de búsquedas
- [ ] Autenticación de usuarios
- [ ] Historial de reservas
- [ ] Pasarela de pago
- [ ] Multi-idioma

## 👨‍💻 Autor

Desarrollado como mini proyecto funcional de sistema de reservas de vuelos.
