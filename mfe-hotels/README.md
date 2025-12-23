# MFE Hotels - Microfrontend de Hoteles

Microfrontend de hoteles implementado con Angular 19 y Native Federation usando el patrón de Lazy Loading Routes.

## 🏨 Características Técnicas

- **Patrón**: Lazy Loading Routes
- **Estado compartido**: Acceso a NgRx Store del shell
- **Navegación**: Sistema de rutas integrado
- **Componentes**: Standalone components
- **Singleton**: Dependencies compartidas con shell
- **SSR**: Server-Side Rendering habilitado

## 🚀 Desarrollo

```bash
npm start
```

**Puerto**: 4201

## 🖥️ Server-Side Rendering (SSR)

### Configuración
- **Framework**: Angular Universal
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
# dist/mfe-hotels/browser/  → Cliente
# dist/mfe-hotels/server/   → Servidor
```

## 📁 Estructura Técnica

```
src/app/
├── hotels/                       # Lista de hoteles
│   ├── hotels.component.ts       # 6 hoteles colombianos
│   ├── hotels.component.html     # Grid con navegación
│   └── hotels.component.less     # Estilos
├── hotel-detail/                 # Detalle de hotel
│   ├── hotel-detail.component.ts
│   ├── hotel-detail.component.html
│   └── hotel-detail.component.less
├── app.routes.ts                 # Rutas expuestas: '', ':id'
├── app.routes.server.ts          # Rutas servidor (SSR)
├── app.config.ts                 # Config cliente
├── app.config.server.ts          # Config SSR
└── app.component.ts              # Root component

src/
├── main.ts                       # Entry point cliente
├── main.server.ts                # Entry point servidor
├── bootstrap.ts                  # Bootstrap cliente
├── bootstrap-server.ts           # Bootstrap servidor
└── server.ts                     # Express server (SSR)

federation.config.js              # Expone './routes'
```

## 🛣️ Configuración de Rutas

### Rutas Expuestas
- `''` → HotelsComponent (lista)
- `:id` → HotelDetailComponent (detalle)

### Integración en Shell
**Path en shell**: `/hotels`  
**Resultado**:
- `/hotels` → Lista de hoteles
- `/hotels/:id` → Detalle del hotel

## 🔧 Configuración de Federation

### Exposición
- **Módulo**: `./routes` (app.routes.ts)
- **Singleton**: `true` (comparte dependencias)
- **Carga**: `loadChildren` en shell

### Estado Compartido
Accede al NgRx Store del shell mediante inyección directa:
- Lectura del estado de usuario
- Navegación reactiva

## 📦 Dependencias Principales

- **Angular**: 19.2.0
- **Native Federation**: 19.0.23
- **TypeScript**: ~5.7.0

## 🔗 Referencias

Ver [README principal](../README.md) para la arquitectura completa del proyecto.


## 📚 Más Información

Este MFE forma parte de una arquitectura de microfrontends usando:
- **Angular 19.2.0**
- **Native Federation 19.0.23**
- **NgRx Store 19.2.1** (shared singleton con el shell)
- **Standalone Components**
- **Patrón**: Lazy Loading de Rutas (no Web Component)

### Diferencias con MFE Flights

| Aspecto | MFE Hotels | MFE Flights |
|---------|------------|-------------|
| **Patrón** | Lazy Routes | Web Component |
| **Exposición** | `./routes` | `./web-component` |
| **Singleton** | `true` | `false` |
| **Integración** | `loadChildren` | Custom Matcher |
| **Store** | Acceso directo | Aislado |

Ver [README principal](../README.md) para arquitectura completa.
