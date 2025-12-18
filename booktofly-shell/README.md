# BookToFly Shell - Host Application

Shell application (host) para la arquitectura de microfrontends de BookToFly. Gestiona el estado global con NgRx Store y carga dinámicamente los microfrontends remotos.

## 🎯 Propósito

El Shell actúa como aplicación host que:
- Gestiona el estado global de la aplicación (usuario)
- Carga microfrontends remotos dinámicamente
- Proporciona navegación unificada
- Comparte el estado mediante NgRx Store singleton

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
│   ├── store/                    # NgRx Store
│   │   ├── user.actions.ts       # Actions: setUser, clearUser
│   │   ├── user.reducer.ts       # Reducer del estado user
│   │   └── user.selectors.ts     # Selectors: selectUser
│   ├── app.routes.ts             # Rutas: home + loadChildren para MFEs
│   ├── app.config.ts             # Providers con provideStore
│   └── app.component.ts          # Root component
├── federation.config.js          # Config de Native Federation
└── package.json
```

## 🛣️ Configuración de Rutas

```typescript
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'hotels',
    loadChildren: () =>
      loadRemoteModule({
        remoteName: 'mfe-hotels',
        exposedModule: './routes'
      }).then(m => m.routes)
  }
];
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

```javascript
remotes: {
  'mfe-hotels': 'http://localhost:4201/remoteEntry.json'
}
```

## 🏠 HomeComponent

Componente principal del shell que:
- Permite establecer el nombre de usuario
- Muestra el usuario actual desde el Store
- Proporciona navegación a los MFEs (Hotels, etc.)
- Persiste el usuario en el estado global

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

