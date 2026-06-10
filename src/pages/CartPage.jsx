import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import '../styles/cart.css'

export default function CartPage() {
  const {
    items,
    subtotal,
    delivery,
    total,
    removeFromCart,
    updateQuantity,
  } = useCart()

  const isEmpty = items.length === 0

  if (isEmpty) {
    return (
      <main className="cart-page">
        <section className="cart-hero">
          <p className="section-eyebrow">KORPA</p>
          <h1>Vaša korpa je prazna</h1>
          <p>
            Još uvek niste dodali nijedan ručno rađeni proizvod u korpu.
          </p>

          <Link to="/prodavnica" className="cart-primary-btn">
            Pogledaj ponudu
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <section className="cart-header container">
        <p className="section-eyebrow">KORPA</p>
        <h1>Vaša korpa</h1>
        <p>Pregledajte proizvode pre nastavka kupovine.</p>
      </section>

      <section className="cart-layout container">
        <div className="cart-items">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>{item.material || 'Ručno rađeno sa ljubavlju'}</p>

                <div className="cart-mobile-price">
                  {item.price.toLocaleString('sr-RS')} {item.currency}
                </div>
              </div>

              <div className="cart-qty">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <div className="cart-price">
                {(item.price * item.quantity).toLocaleString('sr-RS')} {item.currency}
              </div>

              <button
                className="cart-remove"
                type="button"
                onClick={() => removeFromCart(item.id)}
              >
                ×
              </button>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Pregled porudžbine</h2>

          <div className="summary-row">
            <span>Međuzbir</span>
            <strong>{subtotal.toLocaleString('sr-RS')} RSD</strong>
          </div>

          <div className="summary-row">
            <span>Dostava</span>
            <strong>
              {delivery === 0 ? 'Besplatno' : `${delivery.toLocaleString('sr-RS')} RSD`}
            </strong>
          </div>

          <div className="summary-total">
            <span>Ukupno</span>
            <strong>{total.toLocaleString('sr-RS')} RSD</strong>
          </div>

          <Link to="/porucivanje" className="cart-primary-btn full">
            Nastavi na plaćanje
          </Link>

          <Link to="/prodavnica" className="cart-secondary-link">
            ← Nastavi kupovinu
          </Link>
        </aside>
      </section>
    </main>
  )
}
