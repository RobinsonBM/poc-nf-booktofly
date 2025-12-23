# BookToFly Shell - Host Application

Aplicación host para la arquitectura de microfrontends de BookToFly basada en Angular 19+ y Native Federation.

## 🎯 Responsabilidades

- Gestión de estado global con NgRx Store
- Carga dinámica de microfrontends remotos (Hotels, Flights)
- Navegación unificada entre MFEs
- Implementación de dos patrones de integración: Lazy Routes y Web Components
- Server-Side Rendering (SSR) con Angular Universal

## 🚀 Desarrollo

```bash
npm start
```

**Puerto**: 4200  
**Prerequisito**: MFEs deben estar ejecutándose en puertos 4201 (hotels) y 4202 (flights)

## 🖥️ Server-Side Rendering (SSR)

### Configuración
- **Framework**: Angular Universal
- **Servidor**: Express.js
- **Entry point**: `src/server.ts`
- **Config servidor**: `src/app/app.config.server.ts`
- **Rutas servidor**: `src/app/app.routes.server.ts`

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

**Nota**: SSR está deshabilitado en modo desarrollo para mejor performance.

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
# dist/booktofly-shell/browser/  → Cliente
# dist/booktofly-shell/server/   → Servidor
```

### Ejecución Producción
```bash
node dist/booktofly-shell/server/server.mjs
```

## 📁 Estructura Técnica

```
src/app/
├── home/                         # Componente inicial
├── wrapper/                      # Wrapper genérico para Web Components
│   ├── wrapper.component.ts      # Componente reutilizable
│   └── wrapper-config.ts         # Interface de configuración
├── flights-header/               # Header específico de flights
├── store/                        # NgRx Store
│   ├── user.actions.ts           # setUser, clearUser
│   ├── user.reducer.ts           # Reducer de UserState
│   └── user.selectors.ts         # selectUser
├── utils/
│   └── route-matchers.ts         # Custom matchers para routing
├── app.routes.ts                 # Configuración de rutas
├── app.routes.server.ts          # Rutas servidor (SSR)
├── app.config.ts                 # Providers (provideStore)
└── app.config.server.ts          # Config SSR

src/
├── main.ts                       # Entry point cliente
├── main.server.ts                # Entry point servidor
├── bootstrap.ts                  # Bootstrap cliente
├── bootstrap-server.ts           # Bootstrap servidor
└── server.ts                     # Express server (SSR)

public/
└── federation.manifest.json      # Registro de MFEs remotos

federation.config.js              # Configuración Native Federation
```

## 🔧 Configuración de Federation

### Shared Dependencies
- Modo: `singleton: true` para compartir dependencias con MFEs
- NgRx Store expuesto como singleton
- Angular core compartido en versión única

### Rutas Integradas

**Lazy Loading Routes** (Hotels):
- Path: `/hotels`
- Remote: `mfe-hotels`
- Módulo expuesto: `./routes`
- Carga: `loadChildren` con `loadRemoteModule`

**Web Component** (Flights):
- Matcher: Custom `startsWith('flights')`
- Componente: `WrapperComponent` (genérico)
- Configuración via `data`:
  - `remoteName`: 'mfe-flights'
  - `exposedModule`: './web-component'
  - `elementName`: 'mfe-flights-element'
- El wrapper carga dinámicamente el Web Component
- Consume todos los segmentos de ruta

## 🗄️ NgRx Store

### UserState
- `name: string`
- `email: string`

### Actions Disponibles
- `setUser({ name, email })`
- `clearUser()`

### Selector
- `selectUser`: Obtiene el estado completo del usuario
store.dispatch(setUser({ name: 'Juan', email: 'juan@example.com' }));

// Limpiar usuario
store.dispatch(clearUser());
```

### Selectors

```typescript
// En componentes
userName$ = this.store.select(selectUser);
userEmail$ = this.store.select((state: any) => state.user?.email);
```

## 🔗 Integración con MFEs

### Federation Config

```javascript
// federation.config.js
shared: {
  ...shareAll({ 
    singleton: true,        // ✅ Store compartido
    strictVersion: true,
    requiredVersion: 'auto'
  })
}
```
## 📦 Dependencias Principales

- **Angular**: 19.2.0
- **Native Federation**: 19.0.23
- **NgRx Store**: 19.2.1
- **TypeScript**: ~5.7.0

## 🔗 Referencias

Ver [README principal](../README.md) para la arquitectura completa del proyecto.


