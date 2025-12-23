# BookToFly - Arquitectura de Microfrontends con Native Federation

Prueba de concepto de arquitectura de microfrontends con Angular 19+, Native Federation y NgRx Store compartido.

## 📋 Resumen

Demostración de dos patrones de integración de microfrontends:
- **Lazy Loading Routes**: Integración mediante carga dinámica de rutas (Hotels)
- **Web Components**: Aislamiento completo con Angular Elements (Flights)
- **Estado compartido**: NgRx Store singleton entre shell y MFEs
- **Standalone Components**: Arquitectura moderna de Angular

---

## 🏗️ Arquitectura

```
┌────────────────────────────────────────────────────────────┐
│         Shell (booktofly-shell:4200)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ SSR: Angular Universal + Express                     │  │
│  │ - provideServerRendering()                           │  │
│  │ - Server Routes (app.routes.server.ts)               │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ NgRx Store (Singleton) - UserState                   │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ HomeComponent + WrapperComponent (genérico)         │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
   ┌──────────────┐          ┌──────────────────┐
   │ MFE Hotels   │          │ MFE Flights      │
   │ (4201)       │          │ (4202)           │
   │ SSR Enabled  │          │ SSR Enabled      │
   │              │          │                  │
   │ Lazy Routes  │          │ Web Component    │
   │ /hotels      │          │ /flights/*       │
   │              │          │ + Wrapper        │
   │ singleton:   │          │ singleton:       │
   │ true         │          │ false            │
   └──────────────┘          └──────────────────┘
```

## 📦 Proyectos

| Proyecto | Puerto | Patrón | Singleton | SSR | Propósito |
|----------|--------|--------|-----------|-----|----------|
| **booktofly-shell** | 4200 | Host | - | ✅ | Aplicación host, NgRx Store |
| **mfe-hotels** | 4201 | Lazy Routes | `true` | ✅ | Catálogo de hoteles |
| **mfe-flights** | 4202 | Web Component | `false` | ✅ | Sistema de vuelos |

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+
- Angular CLI 19+

### Instalación
```bash
# En cada proyecto (shell, mfe-hotels, mfe-flights)
npm install
```

### Ejecución

**Orden obligatorio**:
1. MFE Hotels (puerto 4201): `cd mfe-hotels && npm start`
2. MFE Flights (puerto 4202): `cd mfe-flights && npm start`
3. Shell (puerto 4200): `cd booktofly-shell && npm start`

⚠️ Los MFEs deben iniciar antes que el shell.

**Acceso**: http://localhost:4200

## 🏨 MFE Hotels (Lazy Routes)

**Patrón**: Lazy Loading de Rutas con `singleton: true`

### Características
- Catálogo de 6 hoteles colombianos
- Vista de lista y detalle
- Precios en COP
- Integración con NgRx Store del shell
- Rutas: `/hotels`, `/hotels/:id`

### Integración
- Carga mediante `loadChildren`
- Comparte dependencias con el shell
- Acceso a estado global

## ✈️ MFE Flights (Web Component)

**Patrón**: Web Component con Angular Elements y `singleton: false`

### Características
- Búsqueda y reserva de vuelos
- Listado y detalle con selector de asientos
- Routing interno `/flights/*`
- Zoneless y Signals

### Integración
- Custom Element: `<mfe-flights-element>`
- WrapperComponent genérico con configuración via `data`
- Custom matcher en shell
- Aislamiento completo de estilos
- Bootstrap con `createApplication`

## 📊 Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|----------|
| Angular | 19.2.0 | Framework principal |
| Angular SSR | 19.2.0 | Server-Side Rendering |
| TypeScript | ~5.7.0 | Lenguaje de programación |
| Native Federation | 19.0.23 | Module Federation |
| NgRx Store | 19.2.1 | Estado global |
| RxJS | 7.8.0 | Programación reactiva |
| Express | - | Servidor SSR |

---

## 📁 Estructura del Proyecto

```
poc-booktofly/
├── booktofly-shell/          # Shell (Host) - Puerto 4200
│   ├── src/app/
│   │   ├── home/             # Componente principal
│   │   ├── wrapper/          # Wrapper genérico para Web Components
│   │   │   ├── wrapper.component.ts
│   │   │   └── wrapper-config.ts
│   │   ├── flights-header/   # Header específico flights
│   │   ├── store/            # NgRx Store (UserState)
│   │   ├── utils/            # Route matchers
│   │   ├── app.routes.ts     # Configuración de rutas
│   │   ├── app.routes.server.ts  # Rutas SSR
│   │   ├── app.config.ts     # Providers
│   │   └── app.config.server.ts  # Config SSR
│   ├── src/
│   │   ├── main.ts           # Entry cliente
│   │   ├── main.server.ts    # Entry servidor
│   │   ├── server.ts         # Express server (SSR)
│   │   ├── bootstrap.ts      # Bootstrap cliente
│   │   └── bootstrap-server.ts  # Bootstrap servidor
│   ├── public/federation.manifest.json
│   └── federation.config.js
│
├── mfe-hotels/               # MFE Hoteles - Puerto 4201
│   ├── src/app/
│   │   ├── hotels/           # Lista de hoteles
│   │   ├── hotel-detail/     # Detalle
│   │   ├── app.routes.ts     # Rutas: '', ':id'
│   │   ├── app.routes.server.ts  # Rutas SSR
│   │   ├── app.config.ts     # Config cliente
│   │   └── app.config.server.ts  # Config SSR
│   ├── src/
│   │   ├── main.ts           # Entry cliente
│   │   ├── main.server.ts    # Entry servidor
│   │   ├── server.ts         # Express server (SSR)
│   │   ├── bootstrap.ts      # Bootstrap cliente
│   │   └── bootstrap-server.ts  # Bootstrap servidor
│   └── federation.config.js  # Expone './routes'
│
├── mfe-flights/              # MFE Vuelos - Puerto 4202
│   ├── src/
│   │   ├── bootstrap.ts      # Bootstrap Web Component
│   │   ├── bootstrap-server.ts  # Bootstrap servidor
│   │   ├── main.ts           # Entry cliente
│   │   ├── main.server.ts    # Entry servidor
│   │   ├── server.ts         # Express server (SSR)
│   │   └── app/
│   │       ├── app.ts        # Root component
│   │       ├── app.config.ts # Config cliente
│   │       ├── app.config.server.ts  # Config SSR
│   │       ├── app.routes.ts # Routing interno
│   │       ├── app.routes.server.ts  # Rutas SSR
│   │       ├── flight-search/
│   │       ├── flight-list/
│   │       └── flight-detail/
│   └── federation.config.js  # Expone './web-component'
│
└── docs/                     # Documentación adicional
```

## 🎯 Patrones de Integración

### Lazy Loading Routes (Hotels)
- **Singleton**: `true`
- **Carga**: `loadChildren` con `loadRemoteModule`
- **Rutas**: Expone `./routes`
- **Estado**: Comparte NgRx Store con shell
- **Ventajas**: Mejor performance, menor bundle size

### Web Components (Flights)
- **Singleton**: `false`
- **Carga**: Custom matcher + `WrapperComponent` genérico
- **Exposición**: `./web-component` (bootstrap.ts)
- **Encapsulación**: Aislamiento completo de estilos
- **Configuración**: Via `data` en rutas (WrapperConfig)
  - `remoteName`: Nombre del remote MFE
  - `exposedModule`: Módulo expuesto
  - `elementName`: Nombre del custom element HTML
- **Ventajas**: Aislamiento total, múltiples instancias posibles, wrapper reutilizable

## ✅ Aspectos Técnicos Validados

- NgRx Store singleton compartido entre shell y MFEs
- Carga dinámica de rutas con `loadChildren`
- Web Components con Angular Elements
- Custom route matchers para Web Components
- Navegación integrada entre shell y MFEs
- Hot reload funcional en desarrollo

## 💡 Consideraciones Importantes

### Server-Side Rendering (SSR)
- Todos los proyectos tienen SSR habilitado con Angular Universal
- Configuración: `provideServerRendering()` en `app.config.server.ts`
- Entry point: `src/server.ts` (Express server)
- Rutas servidor: `app.routes.server.ts`
- Build SSR: `ng build` genera carpetas `browser/` y `server/`

### Configuración Federation
- `singleton: true` esencial para estado compartido
- MFEs deben iniciar antes que el shell
- `federation.manifest.json` generado automáticamente

### Web Components
- Requiere `CUSTOM_ELEMENTS_SCHEMA`
- Bootstrap con `createApplication` en lugar de `bootstrapApplication`
- Custom matcher consume todos los segmentos de ruta

### Lazy Routes
- Comparten dependencias (`singleton: true`)
- Acceso directo al store del shell
- Mejor performance que Web Components

## 🔗 Referencias

- [Angular Native Federation](https://www.npmjs.com/package/@angular-architects/native-federation)
- [NgRx Documentation](https://ngrx.io)
- [Module Federation Guide](https://module-federation.github.io/)
- [Angular Documentation](https://angular.dev)

## 📚 Documentación Adicional

- [Patrones de Integración MFE](docs/patrones-integracion-mfe.md)
- [README Shell](booktofly-shell/README.md)
- [README MFE Hotels](mfe-hotels/README.md)
- [README MFE Flights](mfe-flights/README.md)

---

**Autor:** Robinson Betancur Marin  
**Proyecto:** POC BookToFly - Arquitectura de Microfrontends  
**Estado:** ✅ Funcional
