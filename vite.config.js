import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Ruta base del sitio publicado.
// - En GitHub Actions se define VITE_BASE_PATH con el nombre real del repositorio
//   (por ejemplo "/mi-tienda-videojuegos/"), ver .github/workflows/deploy.yml.
// - Si no se define, se usa "./" (rutas relativas), que también funciona
//   al publicar el sitio dentro de cualquier subdirectorio.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || './',
  plugins: [react()],
});
