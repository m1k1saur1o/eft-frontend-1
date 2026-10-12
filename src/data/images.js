// Imágenes disponibles en la carpeta img/ de la raíz del proyecto.
// Vite las incluye en la compilación y genera URLs compatibles con la ruta base
// de GitHub Pages, por lo que no es necesario copiarlas manualmente a public/.
const imageModules = import.meta.glob('../../img/*.{jpg,jpeg,png,webp,gif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

// Lista de imágenes: { path: 'img/archivo.jpg', url: '<url compilada>' }
export const availableImages = Object.entries(imageModules)
  .map(([modulePath, url]) => ({
    path: modulePath.replace('../../', ''),
    url,
  }))
  .sort((a, b) => a.path.localeCompare(b.path, 'es'));

const imageUrlsByPath = new Map(availableImages.map((image) => [image.path, image.url]));

// Devuelve la URL utilizable de una ruta relativa a img/, o null si el archivo no existe.
export function resolveImage(path) {
  return imageUrlsByPath.get(path) ?? null;
}
