export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-5">
            <p className="brand mb-2">
              Pixel<span className="text-accent">Forge</span>
            </p>
            <p className="footer-text">
              Tienda online de videojuegos para consolas y PC. Catálogo actualizado con lanzamientos,
              clásicos y ofertas para todos los gustos.
            </p>
          </div>

          <nav className="col-6 col-md-3" aria-label="Enlaces del pie de página">
            <h2 className="footer-heading">Secciones</h2>
            <ul className="list-unstyled footer-links">
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#catalogo">Catálogo</a></li>
              <li><a href="#administrar">Administrar</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ul>
          </nav>

          <div className="col-6 col-md-4">
            <h2 className="footer-heading">Información</h2>
            <ul className="list-unstyled footer-text">
              <li>Tienda 100 % online</li>
              <li>Atención: lunes a viernes, 9:00 a 18:00</li>
              <li>Precios en pesos chilenos (CLP)</li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />
        <p className="footer-legal">
          © {year} PixelForge. Proyecto académico de demostración (EFT): los precios y productos son
          ficticios y no se realizan ventas reales. Las marcas y portadas pertenecen a sus respectivos
          propietarios.
        </p>
      </div>
    </footer>
  );
}
