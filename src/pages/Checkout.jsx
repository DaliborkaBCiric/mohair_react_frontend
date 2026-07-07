import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useCart } from '../context/CartContext.jsx'
import '../styles/cart.css'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  note: '',
}

export default function Checkout() {
  const navigate = useNavigate()
  const { items, subtotal, delivery, total, clearCart } = useCart()
  const [form, setForm] = useState(initialForm)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (items.length === 0) {
      setError('Korpa je prazna.')
      return
    }

    try {
      setSending(true)

      await api.sendOrder({
        customer_first_name: form.firstName,
        customer_last_name: form.lastName,
        customer_email: form.email,
        customer_phone: form.phone,
        customer_address: form.address,
        customer_city: form.city,
        customer_postal_code: form.postalCode,
        customer_country: 'Serbia',

        customer_note: form.note,

        payment_method: 'Pouzećem',

        shipping_method_id: 1, // ili odgovarajući ID iz baze

        shipping_amount: delivery,

        subtotal,
        total,

        items: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      })

      clearCart()
      navigate('/uspesna-kupovina')
    } catch (submitError) {
      console.error('Greška pri slanju porudžbine:', submitError)
      setError('Porudžbina trenutno ne može da se pošalje. Pokušajte ponovo.')
    } finally {
      setSending(false)
    }
  }

  if (items.length === 0) {
    return (
      <main className="checkout-page">
        <section className="cart-hero">
          <p className="section-eyebrow">KUPOVINA</p>
          <h1>Korpa je prazna</h1>
          <p>Dodajte proizvode u korpu pre slanja porudžbine.</p>
          <Link to="/prodavnica" className="cart-primary-btn">
            Pogledaj ponudu
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <section className="cart-header container">
        <p className="section-eyebrow">KUPOVINA</p>
        <h1>Podaci za porudžbinu</h1>
        <p>Popunite podatke kako bismo pripremili vašu porudžbinu.</p>
      </section>

      <section className="checkout-layout container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Kontakt i dostava</h2>

          <div className="form-grid">
            <label>
              Ime
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Vaše ime"
                required
              />
            </label>

            <label>
              Prezime
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Vaše prezime"
                required
              />
            </label>
          </div>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
            />
          </label>

          <label>
            Telefon
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+381..."
              required
            />
          </label>

          <label>
            Adresa
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Ulica i broj"
              required
            />
          </label>

          <div className="form-grid">
            <label>
              Grad
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Grad"
                required
              />
            </label>

            <label>
              Poštanski broj
              <input
                type="text"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                placeholder="11000"
                required
              />
            </label>
          </div>

          <label>
            Napomena
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Dodatna napomena za porudžbinu..."
            />
          </label>

          <h2>Način plaćanja</h2>

          <div className="payment-box active">
            <input type="radio" defaultChecked />
            <div>
              <strong>Pouzećem</strong>
              <p>Plaćanje kuriru prilikom preuzimanja.</p>
            </div>
          </div>

          {error && <p className="checkout-error">{error}</p>}

          <button className="cart-primary-btn full" type="submit" disabled={sending}>
            {sending ? 'Slanje porudžbine...' : 'Potvrdi porudžbinu'}
          </button>
        </form>

        <aside className="cart-summary">
          <h2>Vaša porudžbina</h2>

          {items.map((item) => (
            <div className="checkout-product" key={item.id}>
              <span>{item.name} × {item.quantity}</span>
              <strong>
                {(item.price * item.quantity).toLocaleString('sr-RS')} {item.currency}
              </strong>
            </div>
          ))}

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
        </aside>
      </section>
    </main>
  )
}
