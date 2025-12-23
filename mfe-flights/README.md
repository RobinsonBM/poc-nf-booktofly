# MFE Flights - Web Component con Angular Elements

Microfrontend de vuelos implementado como Web Component usando Angular Elements y Native Federation.

## ✨ Características Técnicas

- **Patrón**: Web Component (`<mfe-flights-element>`)
- **Routing**: Interno con gestión de subrutas `/flights/*`
- **Detección de cambios**: Zoneless (sin zone.js)
- **Estado**: Signals de Angular
- **Componentes**: Standalone components
- **SSR**: Server-Side Rendering habilitado

## 🚀 Desarrollo

```bash
npm start
```

**Puerto**: 4202  
**Nota**: Puede ejecutarse independientemente o integrado en el shell

## 🖥️ Server-Side Rendering (SSR)

### Configuración
- **Framework**: Angular Universal
- **Entry point**: `src/server.ts`
- **Config servidor**: `src/app/app.config.server.ts`
- **Rutas servidor**: `src/app/app.routes.server.ts`
- **Nota**: SSR compatible con Web Components

### Configuración en angular.json

```json
{
  "architect": {
    "build": {
      "builder": "@angular-architects/native-federation:build",
      "options": {
        "ssr": true  // SSR habilitado por defecto
      }
    },
    "esbuild": {
      "options": {
        "server": "src/main.server.ts",
        "ssr": {
          "entry": "src/server.ts"
        },
        "prerender": false
      },
      "configurations": {
        "production": {
          // SSR habilitado en producción
        },
        "development": {
          "ssr": false  // SSR deshabilitado en desarrollo
        }
      }
    }
  }
}
```

**Nota**: SSR está deshabilitado en modo desarrollo (`npm start`) para mejor performance.

### Archivos SSR
```
src/
├── server.ts                 # Express server
├── main.server.ts            # Bootstrap servidor
├── bootstrap-server.ts       # Inicialización servidor
└── app/
    ├── app.config.server.ts  # provideServerRendering()
    └── app.routes.server.ts  # ServerRoute[]
```

### Build SSR
```bash
ng build
# Genera:
# dist/mfe-flights/browser/  → Cliente
# dist/mfe-flights/server/   → Servidor
```

### Consideraciones SSR con Web Components
- Web Components se hidratan en el cliente
- Compatible con renderizado del servidor

## 📁 Estructura Técnica

```
src/
├── bootstrap.ts                  # Bootstrap del Web Component
│                                 # - createApplication
│                                 # - createCustomElement
│                                 # - customElements.define
├── bootstrap-server.ts           # Bootstrap servidor
├── main.ts                       # Entry point cliente
├── main.server.ts                # Entry point servidor
├── server.ts                     # Express server (SSR)
└── app/
    ├── app.ts                    # Root component
    ├── app.config.ts             # Zoneless + Router
    ├── app.config.server.ts      # Config SSR
    ├── app.routes.ts             # Rutas internas
    ├── app.routes.server.ts      # Rutas servidor (SSR)
    ├── flight-search/            # Búsqueda
    ├── flight-list/              # Listado
    ├── flight-detail/            # Detalle + selector asientos
    ├── models/
    │   └── flight.model.ts       # Interfaces
    └── services/
        └── flight.service.ts     # Lógica de negocio

federation.config.js              # Expone './web-component'
```

## 🛣️ Rutas Internas

| Path | Componente | Función |
|------|-----------|---------|
| `/flights` | FlightSearchComponent | Formulario búsqueda |
| `/flights/search` | FlightSearchComponent | Alias búsqueda |
| `/flights/list` | FlightListComponent | Resultados |
| `/flights/detail/:id` | FlightDetailComponent | Detalle vuelo |

## 🔧 Configuración de Federation

### Exposición
- **Módulo**: `./web-component` (bootstrap.ts)
- **Singleton**: `false` (aislamiento completo)
- **Zone.js**: Skipped

### Integración en Shell
- **Matcher**: Custom `startsWith('flights')`
- **Componente**: `FlightsWrapperComponent`
- **Schema**: `CUSTOM_ELEMENTS_SCHEMA` requerido
- **Tag**: `<mfe-flights-element>`

## ⚙️ Aspectos Clave del Web Component

### Bootstrap
- Usa `createApplication` en lugar de `bootstrapApplication`
- Requiere `router.initialNavigation()` explícito
- Previene doble registro con `customElements.get()`

### Routing
- Custom matcher en shell consume todos los segmentos
- Router interno maneja navegación
- Preserva estado de navegación

## 📊 Comparación con Lazy Routes

| Característica | Web Component | Lazy Routes |
|---------------|---------------|-------------|
| Singleton | `false` | `true` |
| Aislamiento | Completo | Compartido |
| Bootstrap | `createApplication` | `bootstrapApplication` |
| Overhead | Mayor | Menor |
| Bundle size | Mayor | Menor |

## 📦 Dependencias Principales

- **Angular**: 20.3.0
- **Angular Elements**: 20.3.15
- **Native Federation**: 20.1.7
- **TypeScript**: ~5.9.2

## 🔗 Referencias

Ver [README principal](../README.md) para la arquitectura completa del proyecto.

