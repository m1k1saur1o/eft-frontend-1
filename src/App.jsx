import { useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import GameList from './components/GameList.jsx';
import GameForm from './components/GameForm.jsx';
import Cart from './components/Cart.jsx';
import ContactForm from './components/ContactForm.jsx';
import Footer from './components/Footer.jsx';
import { initialGames } from './data/games.js';
import { ALL_CATEGORIES } from './utils/constants.js';

function createGameId(name) {
  const slug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${slug || 'juego'}-${Date.now().toString(36)}`;
}

export default function App() {
  const [games, setGames] = useState(initialGames);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);
  const [cartItems, setCartItems] = useState([]); // [{ id, quantity }]
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Las categorías se derivan de los datos: no existe una lista duplicada.
  const categories = useMemo(() => {
    const counts = new Map();
    games.forEach((game) => counts.set(game.category, (counts.get(game.category) ?? 0) + 1));
    // Si la categoría seleccionada se quedó sin juegos, se mantiene visible con 0 resultados.
    if (selectedCategory !== ALL_CATEGORIES && !counts.has(selectedCategory)) {
      counts.set(selectedCategory, 0);
    }
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name, 'es'));
  }, [games, selectedCategory]);

  const filteredGames = useMemo(
    () =>
      selectedCategory === ALL_CATEGORIES
        ? games
        : games.filter((game) => game.category === selectedCategory),
    [games, selectedCategory],
  );

  const cartQuantities = useMemo(
    () => Object.fromEntries(cartItems.map((item) => [item.id, item.quantity])),
    [cartItems],
  );

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  function handleAddGame(newGame) {
    setGames((current) => [...current, { ...newGame, id: createGameId(newGame.name) }]);
  }

  function handleRemoveGame(gameId) {
    setGames((current) => current.filter((game) => game.id !== gameId));
    setCartItems((current) => current.filter((item) => item.id !== gameId));
  }

  function handleResetCatalog() {
    setGames(initialGames);
    setCartItems([]);
    setSelectedCategory(ALL_CATEGORIES);
  }

  function handleAddToCart(gameId) {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === gameId);
      if (!existing) return [...current, { id: gameId, quantity: 1 }];
      return current.map((item) =>
        item.id === gameId ? { ...item, quantity: item.quantity + 1 } : item,
      );
    });
  }

  function handleChangeQuantity(gameId, delta) {
    setCartItems((current) =>
      current
        .map((item) => (item.id === gameId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0),
    );
  }

  function handleRemoveFromCart(gameId) {
    setCartItems((current) => current.filter((item) => item.id !== gameId));
  }

  // Une los productos del carrito con sus datos actuales del catálogo.
  const cartDetails = cartItems
    .map((item) => ({ ...item, game: games.find((game) => game.id === item.id) }))
    .filter((item) => item.game);

  return (
    <>
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      <main>
        <Hero games={games} categoryCount={new Set(games.map((game) => game.category)).size} />

        <section id="catalogo" className="section" aria-labelledby="catalogo-titulo">
          <div className="container">
            <header className="section-header">
              <p className="section-eyebrow">Catálogo</p>
              <h2 id="catalogo-titulo" className="section-title">
                Encuentra tu próximo juego
              </h2>
              <p className="section-lead">
                Filtra por categoría y añade tus favoritos al carrito.
              </p>
            </header>

            <CategoryFilter
              categories={categories}
              totalCount={games.length}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <GameList
              games={filteredGames}
              selectedCategory={selectedCategory}
              cartQuantities={cartQuantities}
              onAddToCart={handleAddToCart}
              onRemoveGame={handleRemoveGame}
              onShowAll={() => setSelectedCategory(ALL_CATEGORIES)}
            />
          </div>
        </section>

        <section id="administrar" className="section section-alt" aria-labelledby="administrar-titulo">
          <div className="container">
            <header className="section-header">
              <p className="section-eyebrow">Administración de demostración</p>
              <h2 id="administrar-titulo" className="section-title">
                Agregar videojuegos
              </h2>
              <p className="section-lead">
                Los cambios se guardan solo en esta sesión del navegador: al recargar la página se
                vuelve al catálogo inicial.
              </p>
            </header>
            <GameForm
              categories={categories.map((category) => category.name)}
              onAddGame={handleAddGame}
              onResetCatalog={handleResetCatalog}
            />
          </div>
        </section>

        <section id="contacto" className="section" aria-labelledby="contacto-titulo">
          <div className="container">
            <header className="section-header">
              <p className="section-eyebrow">Contacto</p>
              <h2 id="contacto-titulo" className="section-title">
                ¿Tienes alguna consulta?
              </h2>
              <p className="section-lead">Completa el formulario y valida tus datos.</p>
            </header>
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        items={cartDetails}
        onClose={() => setIsCartOpen(false)}
        onChangeQuantity={handleChangeQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClear={() => setCartItems([])}
      />
    </>
  );
}
