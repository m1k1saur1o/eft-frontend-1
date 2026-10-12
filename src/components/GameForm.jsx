import { useState } from 'react';
import { availableImages } from '../data/images.js';

const EMPTY_GAME = {
  name: '',
  category: '',
  price: '',
  platform: '',
  description: '',
  image: availableImages[0]?.path ?? '',
};

function validateGame(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Ingresa un nombre de al menos 2 caracteres.';
  if (values.category.trim().length < 3) errors.category = 'Ingresa o elige una categoría (mínimo 3 caracteres).';
  const price = Number(values.price);
  if (values.price === '' || !Number.isInteger(price) || price <= 0) {
    errors.price = 'Ingresa un precio entero mayor que 0.';
  }
  if (values.description.trim().length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres.';
  }
  if (!availableImages.some((image) => image.path === values.image)) {
    errors.image = 'Selecciona una imagen de la carpeta img/.';
  }
  return errors;
}

export default function GameForm({ categories, onAddGame, onResetCatalog }) {
  const [values, setValues] = useState(EMPTY_GAME);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setSuccessMessage('');
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateGame(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const name = values.name.trim();
    onAddGame({
      name,
      category: values.category.trim(),
      price: Number(values.price),
      platform: values.platform.trim(),
      description: values.description.trim(),
      image: values.image,
      tag: 'Nuevo',
    });
    setValues(EMPTY_GAME);
    setSuccessMessage(`«${name}» se agregó al catálogo.`);
  }

  const fieldClass = (field, base = 'form-control') => `${base}${errors[field] ? ' is-invalid' : ''}`;
  const previewImage = availableImages.find((image) => image.path === values.image);

  return (
    <div className="panel">
      <form onSubmit={handleSubmit} noValidate aria-describedby="game-form-help">
        <p id="game-form-help" className="form-help">
          Todos los campos, excepto la plataforma, son obligatorios. Las portadas solo pueden
          elegirse entre las imágenes existentes en la carpeta <code>img/</code>.
        </p>

        <div className="row g-4">
          <div className="col-md-8">
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="game-name" className="form-label">Nombre</label>
                <input
                  id="game-name"
                  name="name"
                  type="text"
                  className={fieldClass('name')}
                  value={values.name}
                  onChange={handleChange}
                  required
                  maxLength={60}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'game-name-error' : undefined}
                />
                {errors.name && <div id="game-name-error" className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="col-md-6">
                <label htmlFor="game-category" className="form-label">Categoría</label>
                <input
                  id="game-category"
                  name="category"
                  type="text"
                  list="game-category-options"
                  className={fieldClass('category')}
                  value={values.category}
                  onChange={handleChange}
                  required
                  maxLength={30}
                  placeholder="Ej.: Aventura"
                  aria-invalid={Boolean(errors.category)}
                  aria-describedby={errors.category ? 'game-category-error' : undefined}
                />
                <datalist id="game-category-options">
                  {categories.map((category) => (
                    <option key={category} value={category} />
                  ))}
                </datalist>
                {errors.category && (
                  <div id="game-category-error" className="invalid-feedback">{errors.category}</div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="game-price" className="form-label">Precio (CLP)</label>
                <input
                  id="game-price"
                  name="price"
                  type="number"
                  min="1"
                  step="1"
                  inputMode="numeric"
                  className={fieldClass('price')}
                  value={values.price}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.price)}
                  aria-describedby={errors.price ? 'game-price-error' : undefined}
                />
                {errors.price && <div id="game-price-error" className="invalid-feedback">{errors.price}</div>}
              </div>

              <div className="col-md-6">
                <label htmlFor="game-platform" className="form-label">
                  Plataforma <span className="text-secondary-emphasis">(opcional)</span>
                </label>
                <input
                  id="game-platform"
                  name="platform"
                  type="text"
                  className="form-control"
                  value={values.platform}
                  onChange={handleChange}
                  maxLength={40}
                  placeholder="Ej.: PS5 · PC"
                />
              </div>

              <div className="col-12">
                <label htmlFor="game-image" className="form-label">Portada</label>
                <select
                  id="game-image"
                  name="image"
                  className={fieldClass('image', 'form-select')}
                  value={values.image}
                  onChange={handleChange}
                  required
                  aria-invalid={Boolean(errors.image)}
                  aria-describedby={errors.image ? 'game-image-error' : undefined}
                >
                  {availableImages.map((image) => (
                    <option key={image.path} value={image.path}>
                      {image.path}
                    </option>
                  ))}
                </select>
                {errors.image && <div id="game-image-error" className="invalid-feedback">{errors.image}</div>}
              </div>

              <div className="col-12">
                <label htmlFor="game-description" className="form-label">Descripción</label>
                <textarea
                  id="game-description"
                  name="description"
                  rows="3"
                  className={fieldClass('description')}
                  value={values.description}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={errors.description ? 'game-description-error' : undefined}
                />
                {errors.description && (
                  <div id="game-description-error" className="invalid-feedback">{errors.description}</div>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <p className="form-label mb-2">Vista previa de la portada</p>
            {previewImage ? (
              <img src={previewImage.url} alt={`Vista previa: ${previewImage.path}`} className="form-preview" />
            ) : (
              <div className="form-preview game-card-placeholder">
                <span aria-hidden="true">?</span>
              </div>
            )}
          </div>
        </div>

        {successMessage && (
          <div className="alert alert-success mt-4 mb-0" role="status">
            {successMessage}
          </div>
        )}

        <div className="d-flex flex-wrap gap-3 mt-4">
          <button type="submit" className="btn btn-accent">Agregar videojuego</button>
          <button type="button" className="btn btn-outline-light" onClick={onResetCatalog}>
            Restaurar catálogo inicial
          </button>
        </div>
      </form>
    </div>
  );
}
