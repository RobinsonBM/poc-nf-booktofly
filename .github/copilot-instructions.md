# BookToFly - Instrucciones para Agentes de IA

## 🏗️ Arquitectura General

Este es un PoC de **arquitectura de microfrontends** usando Angular 19+ y Native Federation:

- **Shell** (`booktofly-shell`, puerto 4200): Aplicación host que gestiona estado global (NgRx Store) y carga MFEs
- **MFE Hotels** (`mfe-hotels`, puerto 4201): Microfrontend con lazy loading de rutas 
- **MFE Flights** (`mfe-flights`, puerto 4202): Microfrontend como Web Component usando Angular Elements

### Comunicación y Estado

- **NgRx Store singleton**: El shell expone el store en `singleton: true` para compartir estado entre MFEs
- **User state**: Manejado por el shell en [booktofly-shell/src/app/store](booktofly-shell/src/app/store)
- **Acceso en MFEs**: Los MFEs acceden al store inyectando `Store` directamente

## 🔧 Configuración de Federation

### Patrones de Exposición

**MFE con Lazy Loading de Rutas** (Hotels):
```javascript
// mfe-hotels/federation.config.js
exposes: { './routes': './src/app/app.routes.ts' }
shared: { ...shareAll({ singleton: true }) }
```
Consumo en shell:
```typescript
loadChildren: () => loadRemoteModule({ 
  remoteName: 'mfe-hotels', 
  exposedModule: './routes' 
}).then(m => m.routes)
```

**MFE como Web Component** (Flights):
```javascript
// mfe-flights/federation.config.js
exposes: { './web-component': './src/bootstrap.ts' }
shared: { ...shareAll({ singleton: false }) } // ⚠️ No singleton por aislamiento
```
Consumo en shell usando `CUSTOM_ELEMENTS_SCHEMA` y matcher personalizado (ver [booktofly-shell/src/app/utils/route-matchers.ts](booktofly-shell/src/app/utils/route-matchers.ts))

### Singleton vs Non-Singleton

- **Hotels**: `singleton: true` - comparte dependencias con shell
- **Flights**: `singleton: false` - aislado completamente, necesario para Web Components

---

## 🎨 Web Components con Angular Elements (Deep Dive)

El MFE Flights implementa el patrón **Web Component** usando `@angular/elements`, proporcionando máximo aislamiento.

### Anatomía del Web Component

#### 1. Bootstrap del Web Component ([mfe-flights/src/bootstrap.ts](mfe-flights/src/bootstrap.ts))

```typescript
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

(async () => {
  const app = await createApplication(appConfig);
  
  // ⚠️ CRÍTICO: Inicializar router explícitamente
  const router = app.injector.get(Router);
  router.initialNavigation();
  
  const flightsElement = createCustomElement(App, { injector: app.injector });
  
  // Evitar doble registro
  if (!customElements.get('mfe-flights-element')) {
    customElements.define('mfe-flights-element', flightsElement);
  }
})();
```

**Claves:**
- Usa `createApplication` en lugar de `bootstrapApplication` para control manual
- Requiere `router.initialNavigation()` o las rutas no funcionan
- Chequea `customElements.get()` antes de `define()` para evitar errores de doble registro

#### 2. Componente Raíz con Shadow DOM ([mfe-flights/src/app/app.ts](mfe-flights/src/app/app.ts))

```typescript
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  encapsulation: ViewEncapsulation.ShadowDom  // ⚠️ CRÍTICO para aislamiento
})
export class App {
  protected readonly title = signal('mfe-flights');
}
```

**Por qué `ShadowDom`:**
- Aísla CSS completamente (no hay conflictos con el shell)
- Evita que estilos del shell afecten al MFE
- **TODOS** los componentes hijos también deben usar `ViewEncapsulation.ShadowDom`

#### 3. Configuración en Federation ([mfe-flights/federation.config.js](mfe-flights/federation.config.js))

```javascript
exposes: {
  './web-component': './src/bootstrap.ts'  // Expone bootstrap, no routes
},
shared: {
  ...shareAll({ 
    singleton: false,  // ⚠️ OBLIGATORIO - cada instancia tiene su contexto
    includeSecondaries: false  // Optimización de bundle
  })
}
```

**Diferencias críticas con lazy routes:**
- `singleton: false` → Aislamiento completo de dependencias
- Expone `bootstrap.ts` en lugar de `app.routes.ts`
- Puede saltarse zona.js: `skip: ['zone.js']` si usa zoneless

#### 4. Consumo en el Shell ([booktofly-shell/src/app/flights-wrapper](booktofly-shell/src/app/flights-wrapper))

```typescript
@Component({
  selector: 'app-flights-wrapper',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // ⚠️ REQUERIDO para custom elements
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

**Detalles clave:**
- `CUSTOM_ELEMENTS_SCHEMA`: Permite tags HTML no reconocidos por Angular
- Carga asíncrona en `ngOnInit` antes de renderizar
- El nombre del tag (`mfe-flights-element`) debe coincidir con `customElements.define()`

#### 5. Routing con Custom Matcher ([booktofly-shell/src/app/app.routes.ts](booktofly-shell/src/app/app.routes.ts))

```typescript
{
  matcher: startsWith('flights'),  // Captura /flights/*
  component: FlightsWrapperComponent
}
```

**Custom Matcher Implementation:**
```typescript
// booktofly-shell/src/app/utils/route-matchers.ts
export function startsWith(path: string): UrlMatcher {
  return (segments: UrlSegment[]) => {
    return segments.length > 0 && segments[0].path === path
      ? { consumed: segments }  // Consume TODOS los segmentos
      : null;
  };
}
```

**Por qué custom matcher:**
- Web Components necesitan manejar sus propias subrutas internamente
- `consumed: segments` pasa todos los segmentos al Web Component
- El routing interno del MFE gestiona `/flights/search`, `/flights/detail/:id`, etc.

### Routing Interno del Web Component

El MFE Flights tiene routing completo internamente:
```typescript
// mfe-flights/src/app/app.routes.ts
{
  path: 'flights',
  children: [
    { path: '', component: FlightSearchComponent },
    { path: 'search', component: FlightSearchComponent },
    { path: 'list', component: FlightListComponent },
    { path: 'detail/:id', component: FlightDetailComponent }
  ]
}
```

**Flujo completo:**
1. Usuario navega a `/flights/detail/5` en el shell
2. Matcher `startsWith('flights')` consume todos los segmentos
3. Shell renderiza `<mfe-flights-element>`
4. Bootstrap carga y registra el Web Component
5. Router interno del MFE procesa `/flights/detail/5`
6. Renderiza `FlightDetailComponent` con id=5

### Cuándo Usar Web Components vs Lazy Routes

**Web Components (como Flights):**
✅ Máximo aislamiento de estilos (Shadow DOM)
✅ MFE de equipos completamente separados
✅ Necesidad de múltiples instancias del mismo MFE
✅ Integración con frameworks no-Angular
❌ Overhead de doble Angular runtime
❌ Complejidad adicional en debugging

**Lazy Routes (como Hotels):**
✅ Mejor performance (share singleton)
✅ Acceso directo a servicios del shell
✅ Debugging más sencillo
✅ Menor tamaño de bundle total
❌ Posibles conflictos de estilos
❌ Requiere sincronización de versiones Angular

## 🚀 Flujo de Desarrollo

### Orden de Inicio Obligatorio

```bash
# 1. Instalar dependencias (primera vez)
cd mfe-hotels && npm install
cd ../mfe-flights && npm install  
cd ../booktofly-shell && npm install

# 2. Iniciar MFEs PRIMERO (en paralelo)
# Terminal 1:
cd mfe-hotels && npm start      # localhost:4201

# Terminal 2:
cd mfe-flights && npm start     # localhost:4202

# 3. Iniciar shell DESPUÉS
# Terminal 3:
cd booktofly-shell && npm start # localhost:4200
```

⚠️ **El shell necesita que los MFEs estén corriendo antes** para cargar `federation.manifest.json`

### Puertos Configurados

- Shell: 4200 ([booktofly-shell/angular.json](booktofly-shell/angular.json#L131))
- Hotels: 4201 ([mfe-hotels/angular.json](mfe-hotels/angular.json#L132))
- Flights: 4202 ([mfe-flights/angular.json](mfe-flights/angular.json#L123))

## 📁 Convenciones de Estructura

### Shell
```
booktofly-shell/src/app/
├── store/              # NgRx: actions, reducers, selectors
├── home/               # Componente inicial (establece user en store)
├── flights-wrapper/    # Wrapper para cargar Web Component de flights
├── utils/              # route-matchers.ts para custom matchers
└── app.routes.ts       # Rutas: home + loadChildren/matcher para MFEs
```

### MFEs
```
mfe-{nombre}/src/app/
├── models/             # Interfaces compartidas
├── services/           # Lógica de negocio
├── {feature}/          # Componentes por feature (standalone)
└── app.routes.ts       # Rutas expuestas al shell
```

## 🎯 Patrones Específicos del Proyecto

### Custom Route Matchers

Para Web Components que necesitan capturar todas las subrutas:
```typescript
// Ver: booktofly-shell/src/app/utils/route-matchers.ts
matcher: startsWith('flights')
```
Consume todos los segmentos que empiecen con 'flights'

### Navegación en MFEs

Los MFEs usan rutas **relativas al path del shell**:
- Hotels cargado en `/hotels` → rutas internas: `''`, `:id`
- Flights como Web Component → maneja navegación internamente

### Standalone Components

Todo el proyecto usa standalone components (Angular 19+):
```typescript
@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ...]
})
```

## 🐛 Problemas Comunes

### "Cannot find module './routes'"
- Verifica que el MFE esté corriendo
- Revisa `federation.config.js` → `exposes` coincide con `exposedModule`

### Store undefined en MFE
- Verifica `singleton: true` en `shared` del `federation.config.js`
- Confirma que el shell tiene `provideStore` en [app.config.ts](booktofly-shell/src/app/app.config.ts#L13)

### Web Component no se registra
- Revisa `CUSTOM_ELEMENTS_SCHEMA` en el wrapper component
- Verifica que `bootstrap.ts` llame a `customElements.define`
- Confirma que el nombre del elemento coincide en `define()` y el template
- Asegúrate de que `loadRemoteModule` se complete antes de renderizar

### Estilos no se aíslan en Web Component
- Verifica `ViewEncapsulation.ShadowDom` en el componente raíz
- **TODOS** los componentes hijos también necesitan `ShadowDom` encapsulation
- Los estilos globales del shell NO afectan al Web Component (por diseño)

### Router no funciona en Web Component
- Verifica `router.initialNavigation()` en `bootstrap.ts`
- Confirma que el custom matcher consume todos los segmentos: `{ consumed: segments }`
- Las rutas internas del MFE deben empezar con el path base (ej: `flights/search`)

### "Module has already been loaded" en Web Components
- Verifica `singleton: false` en **TODAS** las dependencias compartidas
- No uses `singleton: true` en ninguna parte del `federation.config.js` del Web Component
- Si el error persiste, limpia `node_modules` y reinstala

## 📚 Referencias Clave

- **README principal**: [README.md](README.md) - Arquitectura general y diagramas
- **Config de Federation**: Cada proyecto tiene `federation.config.js` en raíz
- **NgRx Store**: [booktofly-shell/src/app/store](booktofly-shell/src/app/store)
- **Rutas del Shell**: [booktofly-shell/src/app/app.routes.ts](booktofly-shell/src/app/app.routes.ts)

## 💡 Al Modificar MFEs

1. **Cambiar exposes**: Actualizar `federation.config.js` Y la carga en el shell
2. **Agregar dependencias**: Considerar si debe ser `singleton` o no
3. **Nuevas rutas**: Recordar que las rutas son relativas al path del shell
4. **Cambios de estado**: El store es del shell, los MFEs solo lo consumen
