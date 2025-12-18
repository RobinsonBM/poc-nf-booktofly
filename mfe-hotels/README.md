# MFE Hotels - Microfrontend de Hoteles

Microfrontend de hoteles construido con Angular 19 y Native Federation. Muestra un catálogo de hoteles colombianos con navegación a vista de detalle.

## 🏨 Características

- **Catálogo de Hoteles**: Grid responsivo con 6 hoteles colombianos
- **Vista de Detalle**: Información completa de cada hotel con amenities
- **Estado Compartido**: Integración con NgRx Store del shell para mostrar usuario
- **Navegación**: Sistema de rutas integrado con el shell
- **Precios en COP**: Formato de moneda colombiana con separadores de miles
- **Diseño Moderno**: Paleta de colores navy/blue profesional

## 🚀 Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm start
```

El MFE estará disponible en `http://localhost:4201/`.

## 📁 Estructura del Proyecto

```
mfe-hotels/
├── src/app/
│   ├── hotels/                    # Componente lista de hoteles
│   │   ├── hotels.component.ts    # 6 hoteles colombianos, Store integration
│   │   ├── hotels.component.html  # Grid con banner y navegación
│   │   └── hotels.component.less  # Efectos hover
│   ├── hotel-detail/              # Componente detalle de hotel
│   │   ├── hotel-detail.component.ts    # Lógica de detalle, datos extendidos
│   │   ├── hotel-detail.component.html  # Vista completa con amenities
│   │   └── hotel-detail.component.less
│   ├── app.routes.ts              # Rutas: '' y ':id'
│   └── app.component.ts           # Root component con router-outlet
├── federation.config.js           # Expone './routes'
└── package.json
```

## 🛣️ Rutas

El MFE expone las siguientes rutas mediante Native Federation:

- `''` → **HotelsComponent**: Lista de hoteles
- `:id` → **HotelDetailComponent**: Detalle del hotel

Cuando se integra en el shell bajo `/hotels`:
- `/hotels` → Lista de hoteles
- `/hotels/1` → Detalle del hotel 1

## 🏨 Hoteles Incluidos

1. **Hotel Casa San Agustín** - Cartagena ($580.000 COP)
2. **Four Seasons Casa Medina** - Bogotá ($720.000 COP)
3. **Hotel Estelar Miraflores** - Medellín ($450.000 COP)
4. **GHL Hotel Neiva** - Neiva ($280.000 COP)
5. **Dann Carlton Cali** - Cali ($350.000 COP)
6. **Hotel Charleston Santa Teresa** - Cartagena ($890.000 COP)

## 🔧 Configuración de Federation

```javascript
// federation.config.js
exposes: {
  './routes': './src/app/app.routes.ts'
}
```

El shell carga las rutas usando `loadChildren`:

```typescript
{
  path: 'hotels',
  loadChildren: () => loadRemoteModule({
    remoteName: 'mfe-hotels',
    exposedModule: './routes'
  }).then(m => m.routes)
}
```

## 🎨 Paleta de Colores

- Navy: `#2c3e50`, `#34495e`
- Blue: `#3498db`, `#2980b9`
- Grays: `#f8f9fa`, `#6c757d`, `#e9ecef`

## 📦 Construcción

```bash
ng build
```

## 🧪 Tests

```bash
ng test
```

## 📚 Más Información

Este MFE forma parte de una arquitectura de microfrontends usando:
- **Angular 19.2.0**
- **Native Federation 19.0.23**
- **NgRx Store 19.2.1** (shared singleton con el shell)
- **Standalone Components**

ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
