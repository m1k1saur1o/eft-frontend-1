import { useState } from 'react';

const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#administrar', label: 'Administrar' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Navbar({ cartCount, onOpenCart }) {
  // El menú colapsable se controla con estado de React (sin el JavaScript de Bootstrap).
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top site-navbar" aria-label="Navegación principal">
        <div className="container">
          <a className="navbar-brand brand" href="#inicio" onClick={closeMenu}>
            <span className="brand-mark" aria-hidden="true">▶</span>
            Pixel<span className="text-accent">Forge</span>
          </a>

          <div className="d-flex align-items-center gap-2 order-lg-last">
            <button
              type="button"
              className="btn btn-cart position-relative"
              onClick={() => {
                closeMenu();
                onOpenCart();
              }}
              aria-label={`Abrir carrito, ${cartCount} ${cartCount === 1 ? 'producto' : 'productos'}`}
            >
              <span aria-hidden="true">🛒</span>
              <span className="d-none d-sm-inline ms-1">Carrito</span>
              <span className="badge rounded-pill cart-badge ms-2">{cartCount}</span>
            </button>

            <button
              className="navbar-toggler"
              type="button"
              aria-controls="menu-principal"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>

          <div className={`collapse navbar-collapse${isMenuOpen ? ' show' : ''}`} id="menu-principal">
            <ul className="navbar-nav ms-auto me-lg-3 mb-2 mb-lg-0">
              {NAV_LINKS.map((link) => (
                <li className="nav-item" key={link.href}>
                  <a className="nav-link" href={link.href} onClick={closeMenu}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
