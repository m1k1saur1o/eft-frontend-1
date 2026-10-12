import { resolveImage } from '../data/images.js';

export default function Hero({ games, categoryCount }) {
  // Muestra hasta tres portadas del catálogo actual como decoración.
  const featuredCovers = games
    .map((game) => ({ id: game.id, name: game.name, url: resolveImage(game.image) }))
    .filter((cover) => cover.url)
    .slice(0, 3);

  return (
    <section id="inicio" className="hero" aria-labelledby="inicio-titulo">
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-lg-6">
            <p className="section-eyebrow">Tienda online de videojuegos</p>
            <h1 id="inicio-titulo" className="hero-title">
              Tu próxima partida <span className="text-gradient">empieza aquí</span>
            </h1>
            <p className="hero-lead">
              En PixelForge reunimos acción, aventura, deportes, terror y plataformas en un catálogo
              pensado para todo tipo de jugadores. Explora, filtra por categoría y arma tu carrito.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <a href="#catalogo" className="btn btn-accent btn-lg">
                Ver catálogo
              </a>
              <a href="#contacto" className="btn btn-outline-light btn-lg">
                Contáctanos
              </a>
            </div>
            <dl className="hero-stats">
              <div>
                <dt>Videojuegos</dt>
                <dd>{games.length}</dd>
              </div>
              <div>
                <dt>Categorías</dt>
                <dd>{categoryCount}</dd>
              </div>
            </dl>
          </div>

          {featuredCovers.length > 0 && (
            <div className="col-lg-6 d-none d-md-block">
              <div className="hero-covers" aria-hidden="true">
                {featuredCovers.map((cover) => (
                  <img key={cover.id} src={cover.url} alt="" className="hero-cover" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
