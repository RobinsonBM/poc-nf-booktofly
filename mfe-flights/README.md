# MFE Flights - Web Component con Angular Elements

Microfrontend de vuelos construido con Angular 20+ como **Web Component** usando Angular Elements y Native Federation. Demuestra aislamiento completo con Shadow DOM.

## ✨ Características

- **Web Component**: Implementado como `<mfe-flights-element>` con Angular Elements
- **Shadow DOM**: Aislamiento completo de estilos (ViewEncapsulation.ShadowDom)
- **Routing Interno**: Maneja sus propias subrutas (`/flights/*`)
- **Zoneless**: Usa `provideZonelessChangeDetection()` (sin zone.js)
- **Signals**: Estado reactivo con Angular Signals
- **Standalone Components**: Arquitectura moderna de Angular

## 🚀 Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm start
```

El MFE estará disponible en `http://localhost:4202/`.

⚠️ **Importante**: Este MFE se ejecuta como Web Component en el shell, pero puede probarse de forma independiente.

## 📁 Estructura del Proyecto

```
mfe-flights/
├── src/
│   ├── bootstrap.ts              # ⭐ Bootstrap del Web Component
│   │                             # - createApplication + createCustomElement
│   │                             # - customElements.define('mfe-flights-element')
│   └── app/
│       ├── app.ts                # Componente raíz con Shadow DOM
│       ├── app.config.ts         # Zoneless + Router config
│       ├── app.routes.ts         # Rutas internas: /flights/*
│       ├── flight-search/        # Búsqueda de vuelos
│       ├── flight-list/          # Listado de resultados
│       ├── flight-detail/        # Detalle con selector de asientos
│       ├── models/
│       │   └── flight.model.ts   # Interfaces Flight y FlightSearchCriteria
│       └── services/
│           └── flight.service.ts # Lógica de negocio y datos
├── federation.config.js          # Expone './web-component' con singleton: false
└── package.json
```

## 🎯 Rutas Internas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/flights` | FlightSearchComponent | Formulario de búsqueda |
| `/flights/search` | FlightSearchComponent | Alias de búsqueda |
| `/flights/list` | FlightListComponent | Listado de resultados |
| `/flights/detail/:id` | FlightDetailComponent | Detalle del vuelo |

**Nota**: Las rutas son internas al Web Component. El shell captura `/flights/*` con un custom matcher.

## 🔧 Configuración de Web Component

### 1. Bootstrap (bootstrap.ts)

```typescript
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

(async () => {
  const app = await createApplication(appConfig);
  
  // ⚠️ CRÍTICO: Inicializar router
  const router = app.injector.get(Router);
  router.initialNavigation();
  
  const flightsElement = createCustomElement(App, { injector: app.injector });
  
  if (!customElements.get('mfe-flights-element')) {
    customElements.define('mfe-flights-element', flightsElement);
  }
})();
```

### 2. Componente Raíz con Shadow DOM (app.ts)

```typescript
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  encapsulation: ViewEncapsulation.ShadowDom  // ⚠️ CRÍTICO
})
export class App {
  protected readonly title = signal('mfe-flights');
}
```

**⚠️ Importante**: TODOS los componentes usan `ViewEncapsulation.ShadowDom` para aislamiento completo.

### 3. Federation Config

```javascript
module.exports = withNativeFederation({
  name: 'mfe-flights',
  
  exposes: {
    './web-component': './src/bootstrap.ts'  // No './routes'
  },
  
  shared: {
    ...shareAll({ 
      singleton: false,  // ⚠️ Aislamiento completo
      strictVersion: true,
      requiredVersion: 'auto',
      includeSecondaries: false
    })
  },
  
  skip: ['zone.js']  // Zoneless app
});
```

## 🔗 Integración con el Shell

El shell carga este MFE como Web Component usando un wrapper:

```typescript
// booktofly-shell: flights-wrapper.component.ts
@Component({
  selector: 'app-flights-wrapper',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<mfe-flights-element></mfe-flights-element>`
})
export class FlightsWrapperComponent implements OnInit {
  async ngOnInit() {
    await loadRemoteModule({
      remoteName: 'mfe-flights',
      exposedModule: './web-component'
    });
  }
}
```

**Routing en el shell** con custom matcher:
```typescript
{
  matcher: startsWith('flights'),
  component: FlightsWrapperComponent
}
```

## ⚡ Funcionalidades

### 1. Búsqueda de Vuelos
- Formulario con origen, destino, fecha, pasajeros y clase
- Validación de campos
- Navegación automática a resultados

### 2. Listado de Vuelos
- Cards con información de cada vuelo
- Filtrado dinámico basado en criterios
- Mensaje cuando no hay resultados

### 3. Detalle de Vuelo
- Información completa del vuelo
- Selector de cantidad de asientos
- Cálculo dinámico del precio total
- Servicios incluidos (amenities)

## 🎨 Características de UI

- **Shadow DOM**: Estilos completamente aislados
- Diseño moderno con gradientes
- Efectos hover en cards
- Responsive design
- Señales para reactividad

## 📦 Construcción

```bash
ng build
```

## 🧪 Tests

```bash
ng test
```

## 🔑 Diferencias con MFE Hotels

| Aspecto | MFE Flights | MFE Hotels |
|---------|-------------|------------|
| **Patrón** | Web Component | Lazy Routes |
| **Exposición** | `./web-component` | `./routes` |
| **Singleton** | `false` | `true` |
| **Encapsulation** | `ShadowDom` | `Emulated` |
| **Aislamiento** | Completo | Compartido |
| **Bootstrap** | `createApplication` | `bootstrapApplication` |
| **Routing** | Interno + Custom Matcher | `loadChildren` |
| **Zone.js** | Skipped (zoneless) | Incluido |

## 📚 Stack Tecnológico

- **Angular**: 20.3.0
- **Angular Elements**: 20.3.15
- **Native Federation**: 20.1.7
- **TypeScript**: ~5.9.2
- **Signals**: Built-in
- **LESS**: 4.2.0

## 💡 Cuándo Usar Este Patrón

**✅ Ventajas:**
- Máximo aislamiento de estilos (Shadow DOM)
- Equipos completamente independientes
- Posibilidad de múltiples instancias
- Integración con frameworks no-Angular

**❌ Desventajas:**
- Overhead de doble Angular runtime
- Mayor complejidad en debugging
- No comparte estado con el shell (por diseño)
- Bundle size mayor

## 🐛 Troubleshooting

### Web Component no se registra
- Verifica `CUSTOM_ELEMENTS_SCHEMA` en el wrapper
- Confirma que `bootstrap.ts` llama a `customElements.define()`
- El nombre debe coincidir: `'mfe-flights-element'`

### Rutas no funcionan
- Verifica `router.initialNavigation()` en bootstrap
- Confirma que el matcher consume todos los segmentos
- Las rutas internas deben empezar con `/flights`

### Estilos no se aíslan
- Todos los componentes necesitan `ViewEncapsulation.ShadowDom`
- Verifica que no haya estilos globales inyectados

## 📚 Más Información

Este MFE forma parte de la arquitectura de microfrontends de BookToFly. Ver:
- [README principal](../README.md)
- [README del Shell](../booktofly-shell/README.md)
- [Instrucciones Copilot](../.github/copilot-instructions.md) - Guía completa de Web Components

---

**Autor**: Robinson Betancur Marin  
**Patrón**: Web Component con Angular Elements  
**Estado**: ✅ Funcional
