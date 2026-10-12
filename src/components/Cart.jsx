import { useEffect, useRef } from 'react';
import { resolveImage } from '../data/images.js';
import { formatPrice } from '../utils/formatPrice.js';

export default function Cart({ isOpen, items, onClose, onChangeQuantity, onRemoveItem, onClear }) {
  const closeButtonRef = useRef(null);

  // Mueve el foco al panel al abrirlo.
  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  // Cierra el panel con la tecla Escape.
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const total = items.reduce((sum, item) => sum + item.game.price * item.quantity, 0);

  return (
    <>
      <aside
        className={`offcanvas offcanvas-end cart-panel${isOpen ? ' show' : ''}`}
        tabIndex="-1"
        aria-labelledby="carrito-titulo"
        aria-modal={isOpen ? 'true' : undefined}
        role="dialog"
        hidden={!isOpen}
      >
        <div className="offcanvas-header">
          <h2 className="offcanvas-title h5" id="carrito-titulo">Tu carrito</h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="btn-close btn-close-white"
            aria-label="Cerrar carrito"
            onClick={onClose}
          />
        </div>

        <div className="offcanvas-body d-flex flex-column">
          {items.length === 0 ? (
            <p className="text-secondary-emphasis">Tu carrito está vacío. Añade juegos desde el catálogo.</p>
          ) : (
            <ul className="list-unstyled cart-list">
              {items.map(({ id, quantity, game }) => {
                const imageUrl = resolveImage(game.image);
                return (
                  <li key={id} className="cart-item">
                    {imageUrl ? (
                      <img src={imageUrl} alt="" className="cart-thumb" />
                    ) : (
                      <div className="cart-thumb game-card-placeholder" aria-hidden="true" />
                    )}
                    <div className="flex-grow-1">
                      <p className="cart-item-name">{game.name}</p>
                      <p className="cart-item-price">{formatPrice(game.price * quantity)}</p>
                      <div className="d-flex align-items-center gap-2">
                        <div className="btn-group btn-group-sm" role="group" aria-label={`Cantidad de ${game.name}`}>
                          <button
                            type="button"
                            className="btn btn-outline-light"
                            onClick={() => onChangeQuantity(id, -1)}
                            aria-label={`Quitar una unidad de ${game.name}`}
                          >
                            −
                          </button>
                          <span className="btn btn-outline-light disabled cart-qty" aria-live="polite">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            className="btn btn-outline-light"
                            onClick={() => onChangeQuantity(id, 1)}
                            aria-label={`Añadir una unidad de ${game.name}`}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="btn btn-sm btn-link link-danger"
                          onClick={() => onRemoveItem(id)}
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-auto pt-3 cart-summary">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span>Total</span>
              <strong className="game-price mb-0">{formatPrice(total)}</strong>
            </div>
            <p className="small text-secondary-emphasis">
              Sitio de demostración: no se procesan pagos ni se realizan compras reales.
            </p>
            <button
              type="button"
              className="btn btn-outline-danger w-100"
              onClick={onClear}
              disabled={items.length === 0}
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      </aside>
      {isOpen && <div className="offcanvas-backdrop fade show" onClick={onClose} aria-hidden="true" />}
    </>
  );
}
