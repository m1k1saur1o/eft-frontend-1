import GameCard from './GameCard.jsx';
import { ALL_CATEGORIES } from '../utils/constants.js';

export default function GameList({
  games,
  selectedCategory,
  cartQuantities,
  onAddToCart,
  onRemoveGame,
  onShowAll,
}) {
  if (games.length === 0) {
    const isFiltered = selectedCategory !== ALL_CATEGORIES;
    return (
      <div className="alert alert-info empty-state text-center" role="status">
        <p className="mb-3">
          {isFiltered
            ? `No hay videojuegos disponibles en la categoría «${selectedCategory}».`
            : 'El catálogo está vacío. Agrega un videojuego o restaura el catálogo inicial.'}
        </p>
        {isFiltered ? (
          <button type="button" className="btn btn-accent" onClick={onShowAll}>
            Ver todo el catálogo
          </button>
        ) : (
          <a href="#administrar" className="btn btn-accent">
            Ir a administrar
          </a>
        )}
      </div>
    );
  }

  return (
    <>
      <p className="results-count" aria-live="polite">
        Mostrando {games.length} {games.length === 1 ? 'videojuego' : 'videojuegos'}
        {selectedCategory !== ALL_CATEGORIES && ` en «${selectedCategory}»`}
      </p>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {games.map((game) => (
          <div className="col" key={game.id}>
            <GameCard
              game={game}
              quantityInCart={cartQuantities[game.id] ?? 0}
              onAddToCart={onAddToCart}
              onRemove={onRemoveGame}
            />
          </div>
        ))}
      </div>
    </>
  );
}
