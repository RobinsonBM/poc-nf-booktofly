# BookToFly Shell - Host Application

Shell application (host) para la arquitectura de microfrontends de BookToFly. Gestiona el estado global con NgRx Store y carga dinámicamente los microfrontends remotos.

## 🎯 Propósito

El Shell actúa como aplicación host que:
- Gestiona el estado global de la aplicación (NgRx Store)
- Carga microfrontends remotos dinámicamente (Hotels y Flights)
- Proporciona navegación unificada
- Comparte el estado mediante NgRx Store singleton
- Maneja dos patrones de integración: **Lazy Routes** y **Web Components**

## 🚀 Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200/`.

**Importante**: Los MFEs deben estar ejecutándose antes de iniciar el shell.

## 📁 Estructura del Proyecto

```
booktofly-shell/
├── src/app/
│   ├── home/                     # Componente home
│   │   ├── home.component.ts     # Establece usuario en Store
│   │   └── home.component.html   # Formulario y navegación a MFEs
│   ├── flights-wrapper/          # ⭐ Wrapper para Web Component
│   │   └── flights-wrapper.component.ts  # Carga mfe-flights-element
│   ├── store/                    # NgRx Store
│   │   ├── user.actions.ts       # Actions: setUser, clearUser
│   │   ├── user.reducer.ts       # Reducer del estado user
│   │   └── user.selectors.ts     # Selectors: selectUser
│   ├── utils/                    # Utilidades
│   │   └── route-matchers.ts     # Custom matchers para Web Components
│   ├── app.routes.ts             # Rutas: home + loadChildren + matcher
│   ├── app.config.ts             # Providers con provideStore
│   └── app.component.ts          # Root component
├── public/
│   └── federation.manifest.json  # Manifest de MFEs remotos
├── federation.config.js          # Config de Native Federation
└── package.json
```

## 🛣️ Configuración de Rutas

### Patrón 1: Lazy Loading de Rutas (Hotels)

```typescript
{
  path: 'hotels',
  loadChildren: () =>
    loadRemoteModule({
      remoteName: 'mfe-hotels',
      exposedModule: './routes'
    }).then(m => m.routes)
}
```

### Patrón 2: Web Component (Flights)

```typescript
{
  matcher: startsWith('flights'),  // Custom matcher
  component: FlightsWrapperComponent
}
```

**Custom Matcher** (utils/route-matchers.ts):
```typescript
export function startsWith(path: string): UrlMatcher {
  return (segments: UrlSegment[]) => {
    return segments.length > 0 && segments[0].path === path
      ? { consumed: segments }  // Consume TODOS los segmentos
      : null;
  };
}
```

## 🔧 NgRx Store - Estado Global

### Estado del Usuario

```typescript
interface UserState {
  name: string;
  email: string;
}
```

### Actions

```typescript
// Establecer usuario
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

### Remotes

```json
// public/federation.manifest.json
{
  "mfe-hotels": "http://localhost:4201/remoteEntry.json",
  "mfe-flights": "http://localhost:4202/remoteEntry.json"
}
```

## 🏠 HomeComponent

Componente principal del shell que:
- Permite establecer el nombre de usuario
- Muestra el usuario actual desde el Store
- Proporciona navegación a los MFEs (Hotels, Flights)
- Persiste el usuario en el estado global

---

## ✈️ FlightsWrapperComponent

**Wrapper para cargar el Web Component de Flights:**

```typescript
@Component({
  selector: 'app-flights-wrapper',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // ⚠️ Requerido
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

**Aspectos clave:**
- Requiere `CUSTOM_ELEMENTS_SCHEMA` para tags personalizados
- Carga asíncrona del Web Component en `ngOnInit`
- El tag `<mfe-flights-element>` debe coincidir con el nombre en `customElements.define()`

## 📦 Construcción

```bash
ng build
```

## 🧪 Tests

```bash
ng test
```

## 🔑 Dependencias Clave

- **Angular**: 19.2.0
- **Native Federation**: 19.0.23
- **NgRx Store**: 19.2.1
- **TypeScript**: ~5.7.0

## 📚 Más Información

Este shell forma parte de la arquitectura de microfrontends de BookToFly. Ver el [README principal](../README.md) para más detalles sobre la arquitectura completa.

