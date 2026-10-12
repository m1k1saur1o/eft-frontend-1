import { resolveImage } from '../data/images.js';
import { formatPrice } from '../utils/formatPrice.js';

export default function GameCard({ game, quantityInCart, onAddToCart, onRemove }) {
  const imageUrl = resolveImage(game.image);

  return (
    <article className="card game-card h-100">
      <div className="game-card-media">
        {imageUrl ? (
          <img src={imageUrl} alt={`Portada de ${game.name}`} className="game-card-img" loading="lazy" />
        ) : (
          // Alternativa en CSS cuando la imagen no existe en img/.
          <div className="game-card-placeholder" role="img" aria-label={`${game.name} (sin portada)`}>
            <span aria-hidden="true">{game.name.charAt(0)}</span>
          </div>
        )}
        {game.tag && <span className="badge game-tag">{game.tag}</span>}
      </div>

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <span className="badge game-category">{game.category}</span>
          {game.platform && <span className="game-platform">{game.platform}</span>}
        </div>
        <h3 className="card-title game-title">{game.name}</h3>
        <p className="card-text game-description">{game.description}</p>

        <div className="mt-auto">
          <p className="game-price">{formatPrice(game.price)}</p>
          <div className="d-grid gap-2">
            <button type="button" className="btn btn-accent" onClick={() => onAddToCart(game.id)}>
              {quantityInCart > 0 ? `Añadir otro (${quantityInCart} en carrito)` : 'Añadir al carrito'}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => onRemove(game.id)}
              aria-label={`Eliminar ${game.name} del catálogo`}
            >
              Eliminar del catálogo
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
