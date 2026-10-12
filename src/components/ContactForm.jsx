import { useRef, useState } from 'react';

const INITIAL_VALUES = { name: '', email: '', message: '' };
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 500;

const NAME_PATTERN = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Reglas de validación por campo. Devuelven el mensaje de error o una cadena vacía.
const validators = {
  name(value) {
    const name = value.trim();
    if (!name) return 'El nombre es obligatorio.';
    if (name.length < 2) return 'El nombre debe tener al menos 2 caracteres.';
    if (!NAME_PATTERN.test(name)) return 'El nombre solo puede contener letras, espacios, apóstrofos y guiones.';
    return '';
  },
  email(value) {
    const email = value.trim();
    if (!email) return 'El correo electrónico es obligatorio.';
    if (!EMAIL_PATTERN.test(email)) return 'Ingresa un correo válido, por ejemplo: nombre@dominio.cl.';
    return '';
  },
  message(value) {
    const message = value.trim();
    if (!message) return 'El mensaje no puede estar vacío.';
    if (message.length < MESSAGE_MIN) return `El mensaje debe tener al menos ${MESSAGE_MIN} caracteres.`;
    return '';
  },
};

function validateAll(values) {
  return Object.fromEntries(
    Object.keys(validators).map((field) => [field, validators[field](values[field])]),
  );
}

export default function ContactForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submittedName, setSubmittedName] = useState('');
  const fieldRefs = { name: useRef(null), email: useRef(null), message: useRef(null) };

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setSubmittedName('');
    // Revalida en vivo solo los campos que el usuario ya visitó.
    if (touched[name]) {
      setErrors((current) => ({ ...current, [name]: validators[name](value) }));
    }
  }

  function handleBlur(event) {
    const { name, value } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({ ...current, [name]: validators[name](value) }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateAll(values);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, message: true });

    const firstInvalidField = Object.keys(validationErrors).find((field) => validationErrors[field]);
    if (firstInvalidField) {
      fieldRefs[firstInvalidField].current?.focus();
      return;
    }

    setSubmittedName(values.name.trim());
    setValues(INITIAL_VALUES);
    setErrors({});
    setTouched({});
  }

  const fieldClass = (field) => {
    if (!touched[field]) return 'form-control';
    return `form-control ${errors[field] ? 'is-invalid' : 'is-valid'}`;
  };

  const describedBy = (field, extra) =>
    [errors[field] ? `contact-${field}-error` : null, extra].filter(Boolean).join(' ') || undefined;

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="panel">
          {submittedName && (
            <div className="alert alert-success" role="status">
              <strong>¡Gracias, {submittedName}!</strong> Tus datos fueron validados correctamente.
              <br />
              <span className="small">
                Nota: este sitio es una demostración publicada en GitHub Pages y no cuenta con un
                servicio de envío, por lo que el mensaje <strong>no se ha enviado</strong> realmente.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="contact-name" className="form-label">Nombre</label>
                <input
                  ref={fieldRefs.name}
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={fieldClass('name')}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  minLength={2}
                  maxLength={60}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={describedBy('name')}
                />
                {errors.name && (
                  <div id="contact-name-error" className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="contact-email" className="form-label">Correo electrónico</label>
                <input
                  ref={fieldRefs.email}
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={fieldClass('email')}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  maxLength={100}
                  placeholder="nombre@dominio.cl"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={describedBy('email')}
                />
                {errors.email && (
                  <div id="contact-email-error" className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="col-12">
                <label htmlFor="contact-message" className="form-label">Mensaje</label>
                <textarea
                  ref={fieldRefs.message}
                  id="contact-message"
                  name="message"
                  rows="5"
                  className={fieldClass('message')}
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  minLength={MESSAGE_MIN}
                  maxLength={MESSAGE_MAX}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={describedBy('message', 'contact-message-count')}
                />
                {errors.message && (
                  <div id="contact-message-error" className="invalid-feedback">{errors.message}</div>
                )}
                <div id="contact-message-count" className="form-text text-end">
                  {values.message.length}/{MESSAGE_MAX} caracteres
                </div>
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-accent btn-lg">
                  Validar mensaje
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
