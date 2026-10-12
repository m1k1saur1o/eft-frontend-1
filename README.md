# PixelForge · Tienda online de videojuegos

Proyecto de la Evaluación Final Transversal (EFT): sitio web frontend de una tienda de videojuegos, desarrollado con React, Bootstrap 5 y Vite, y preparado para publicarse en GitHub Pages.

## Descripción y objetivo

PixelForge es una tienda de videojuegos **de demostración**. El sitio muestra un catálogo de juegos en tarjetas, permite filtrarlos por categoría, agregar y eliminar juegos del catálogo, gestionar un carrito con cantidades y validar un formulario de contacto.

El objetivo es aplicar HTML5 semántico, CSS3, JavaScript moderno, Bootstrap 5 y React (componentes, `props` y `state`) en un sitio responsivo y publicable sin servidor backend.

> Los precios y productos son ficticios. No se procesan pagos ni se realizan compras reales.

## Características principales

- Barra de navegación fija y responsiva, con menú colapsable en móviles y contador del carrito.
- Sección de inicio con presentación de la tienda.
- Catálogo en tarjetas (imagen, nombre, categoría, plataforma, precio en CLP, descripción y botones).
- Filtro por categoría con contador de juegos por categoría y mensaje cuando no hay resultados.
- Formulario de administración de demostración para **agregar** videojuegos.
- Botón para **eliminar** cada videojuego del catálogo y botón para restaurar el catálogo inicial.
- Carrito lateral: añadir productos, cambiar cantidades, quitar productos, vaciar el carrito y ver el total.
- Formulario de contacto con validación en React y mensajes de error accesibles.
- Pie de página con información general y enlaces a las secciones.
- Despliegue automático en GitHub Pages mediante GitHub Actions.

## Tecnologías utilizadas

| Tecnología | Uso |
| --- | --- |
| HTML5 | Estructura semántica (`header`, `nav`, `main`, `section`, `article`, `footer`). |
| CSS3 | Identidad visual personalizada en `src/styles/styles.css`. |
| JavaScript (ES2020+) | Lógica de filtrado, validaciones, carrito y formato de precios. |
| Bootstrap 5.3 | Navbar, grilla, tarjetas, botones, formularios, alertas y offcanvas (solo CSS). |
| React 18 | Componentes, `props` y estado con `useState`. |
| Vite 6 | Servidor de desarrollo y compilación de producción. |
| Git, GitHub y GitHub Actions | Control de versiones y publicación en GitHub Pages. |

## Estructura del proyecto

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # Compila y publica en GitHub Pages
├── img/                        # Portadas de los videojuegos (únicas imágenes usadas)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Barra de navegación y botón del carrito
│   │   ├── Hero.jsx            # Presentación inicial
│   │   ├── CategoryFilter.jsx  # Botones de filtro por categoría
│   │   ├── GameList.jsx        # Catálogo filtrado / mensaje sin resultados
│   │   ├── GameCard.jsx        # Tarjeta de un videojuego
│   │   ├── GameForm.jsx        # Formulario para agregar videojuegos
│   │   ├── Cart.jsx            # Carrito lateral
│   │   ├── ContactForm.jsx     # Formulario de contacto con validación
│   │   └── Footer.jsx          # Pie de página
│   ├── data/
│   │   ├── games.js            # Catálogo inicial
│   │   └── images.js           # Lista de imágenes de img/ y resolución de rutas
│   ├── styles/
│   │   └── styles.css          # Estilos personalizados
│   ├── utils/
│   │   ├── constants.js        # Constante de la opción "Todas"
│   │   └── formatPrice.js      # Formato monetario CLP
│   ├── App.jsx                 # Componente principal y estado global
│   └── main.jsx                # Punto de entrada de React
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Requisitos previos

- [Node.js](https://nodejs.org/) 20 o superior (incluye npm).
- Git.
- Una cuenta de GitHub para publicar el sitio.

## Instalación y ejecución local

1. Clonar el repositorio (reemplaza `USUARIO` y `NOMBRE-DEL-REPOSITORIO`):

   ```bash
   git clone https://github.com/USUARIO/NOMBRE-DEL-REPOSITORIO.git
   cd NOMBRE-DEL-REPOSITORIO
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo (por defecto en `http://localhost:5173`):

   ```bash
   npm run dev
   ```

4. Generar la compilación de producción en la carpeta `dist/`:

   ```bash
   npm run build
   ```

5. Previsualizar localmente la compilación:

   ```bash
   npm run preview
   ```

## Publicación en GitHub Pages

### Ruta base (`base`) de Vite

Un sitio de proyecto de GitHub Pages se publica en un subdirectorio:
`https://USUARIO.github.io/NOMBRE-DEL-REPOSITORIO/`.

En `vite.config.js` la ruta base se toma de la variable de entorno `VITE_BASE_PATH`:

```js
base: process.env.VITE_BASE_PATH || './',
```

- El flujo de GitHub Actions define `VITE_BASE_PATH=/${{ github.event.repository.name }}/`, es decir, usa **automáticamente el nombre real del repositorio**. No es necesario editar ningún archivo si se cambia el nombre del repositorio.
- Si se compila sin la variable (por ejemplo con `npm run build` en local), se usa `./` (rutas relativas), que también funciona dentro de cualquier subdirectorio.
- Para compilar localmente con una ruta concreta: `VITE_BASE_PATH=/NOMBRE-DEL-REPOSITORIO/ npm run build` (Linux/macOS).

### Pasos para publicar

1. Crear un repositorio en GitHub y subir el proyecto a la rama `main`:

   ```bash
   git add .
   git commit -m "Tienda de videojuegos EFT"
   git branch -M main
   git remote add origin https://github.com/USUARIO/NOMBRE-DEL-REPOSITORIO.git
   git push -u origin main
   ```

2. En GitHub, ir a **Settings → Pages** y, en **Build and deployment → Source**, seleccionar **GitHub Actions**.
3. Cada `push` a `main` ejecuta el flujo `.github/workflows/deploy.yml`. También puede lanzarse manualmente desde la pestaña **Actions → Desplegar en GitHub Pages → Run workflow**.
4. Al terminar, la URL publicada aparece en el resumen del flujo y en **Settings → Pages**.

### Qué hace el flujo de GitHub Actions

`.github/workflows/deploy.yml` tiene dos trabajos:

1. **build**: descarga el código, instala Node.js 20, ejecuta `npm ci`, compila con `npm run build` (con `VITE_BASE_PATH`) y sube la carpeta `dist/` como artefacto de Pages.
2. **deploy**: publica ese artefacto con `actions/deploy-pages`.

El flujo usa solo los permisos `pages: write` e `id-token: write`; no requiere tokens ni secretos adicionales.

## Cómo agregar videojuegos e imágenes

### Desde la interfaz

En la sección **Administrar** se completa el formulario (nombre, categoría, precio, plataforma opcional, portada y descripción) y se pulsa **Agregar videojuego**. La portada se elige de una lista generada automáticamente con los archivos de la carpeta `img/`. Los cambios viven en el estado de React: **se pierden al recargar la página**.

### En el código (cambio permanente)

1. Copiar la imagen en la carpeta `img/` (formatos admitidos: `jpg`, `jpeg`, `png`, `webp`, `gif`, `svg`).
2. Agregar un objeto en `src/data/games.js`:

   ```js
   {
     id: 'nuevo-juego',            // identificador único
     name: 'Nuevo juego',
     category: 'Aventura',
     price: 39990,                 // número, en CLP
     platform: 'PS5 · PC',         // opcional
     description: 'Descripción breve del juego.',
     image: 'img/nombre exacto del archivo.jpg', // ruta relativa dentro de img/
     tag: 'Nuevo',                 // opcional
   }
   ```

La propiedad `image` debe coincidir exactamente con el nombre del archivo (mayúsculas, minúsculas, espacios y extensión). `src/data/images.js` usa `import.meta.glob` para que Vite incluya todas las imágenes de `img/` en la compilación y genere URLs correctas para la ruta base de GitHub Pages. Si una ruta no existe, la tarjeta muestra una portada alternativa hecha con CSS en lugar de una imagen rota.

## Filtrado por categorías

- `App.jsx` guarda la lista de juegos (`games`) y la categoría seleccionada (`selectedCategory`) con `useState`.
- Las categorías **se derivan de los datos** (no hay una lista duplicada): al agregar un juego con una categoría nueva, aparece automáticamente un botón para ella.
- `CategoryFilter` recibe las categorías y la selección por `props` y avisa los cambios con `onSelectCategory`.
- `GameList` recibe la lista ya filtrada. El botón **Todas** muestra nuevamente el catálogo completo.
- Si la categoría seleccionada se queda sin juegos (por ejemplo, tras eliminarlos), se muestra un mensaje informativo con un botón para volver al catálogo completo.

## Formulario de contacto: validación y limitaciones

`ContactForm.jsx` gestiona los valores, los errores y los campos visitados con `useState`:

- **Nombre**: obligatorio, mínimo 2 caracteres, solo letras (incluidas tildes y ñ), espacios, apóstrofos y guiones.
- **Correo electrónico**: obligatorio y con formato `usuario@dominio.ext`.
- **Mensaje**: obligatorio, entre 10 y 500 caracteres (con contador).
- Los errores aparecen junto a cada campo (`invalid-feedback` de Bootstrap, `aria-invalid` y `aria-describedby`), al salir del campo y al enviar. Al enviar con errores, el foco pasa al primer campo inválido.
- Se usa `event.preventDefault()` y `noValidate` para que la validación la controle React; los atributos HTML5 (`required`, `type="email"`, `minLength`, `maxLength`) se mantienen como apoyo.

**Limitación:** GitHub Pages solo sirve archivos estáticos y no ejecuta código de servidor. El formulario **no envía** el mensaje a ningún destino: cuando los datos son válidos muestra una confirmación que lo indica explícitamente. Para enviarlos realmente habría que integrar un servicio externo de formularios, sin exponer credenciales en el frontend.

## Componentes React principales

| Componente | Responsabilidad | Props principales |
| --- | --- | --- |
| `App` | Coordina las secciones y guarda el estado: juegos, categoría, carrito y apertura del carrito. | — |
| `Navbar` | Navegación entre secciones; menú móvil controlado con estado; botón del carrito. | `cartCount`, `onOpenCart` |
| `Hero` | Presentación de la tienda y cifras del catálogo. | `games`, `categoryCount` |
| `CategoryFilter` | Botones para elegir la categoría. | `categories`, `totalCount`, `selectedCategory`, `onSelectCategory` |
| `GameList` | Grilla de tarjetas o mensaje sin resultados. | `games`, `selectedCategory`, `cartQuantities`, `onAddToCart`, `onRemoveGame`, `onShowAll` |
| `GameCard` | Tarjeta de un videojuego. | `game`, `quantityInCart`, `onAddToCart`, `onRemove` |
| `GameForm` | Alta de videojuegos con validación y restauración del catálogo. | `categories`, `onAddGame`, `onResetCatalog` |
| `Cart` | Carrito lateral (cantidades, total, vaciar). Se cierra con Escape, con el botón o al pulsar fuera. | `isOpen`, `items`, `onClose`, `onChangeQuantity`, `onRemoveItem`, `onClear` |
| `ContactForm` | Formulario de contacto con validación. | — |
| `Footer` | Información general y enlaces. | — |

Todas las actualizaciones de estado crean arreglos u objetos nuevos (`map`, `filter`, *spread*), sin mutar el estado existente. Las listas usan el `id` de cada juego como `key`.

## Problemas conocidos y limitaciones

- Los juegos agregados o eliminados y el contenido del carrito se guardan solo en memoria: se pierden al recargar la página.
- El formulario de contacto solo valida los datos; no envía mensajes (ver la sección anterior).
- El carrito es de demostración: no existe proceso de pago.
- Los precios, plataformas y descripciones son datos de ejemplo y no representan precios comerciales ni disponibilidad real.
- Las portadas pertenecen a sus respectivos propietarios y se usan con fines académicos.
