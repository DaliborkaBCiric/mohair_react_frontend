import { SITE } from '../confg/config.js'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { api } from '../services/api'
import { PhoneCall, Mail, MapPin, Gift, HeartHandshake } from 'lucide-react'
import {
  FaInstagram,
  FaPinterestP
} from 'react-icons/fa'
import contactToys from '../assets/contact-toys.png'
import '../styles/contact.css'
import CollaborationBanner from '../components/banners/CollaborationBanner.jsx'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setLoading(true)
      setSuccess('')
      setError('')

      await api.sendContact(formData)

      setSuccess('Poruka je uspešno poslata. Odgovorićemo vam u najkraćem roku. ♡')

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      })
    } catch (err) {
      setError('Došlo je do greške prilikom slanja poruke. Pokušajte ponovo.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <main className="contact-page">
      <section className="contact-top container">
        <div className="contact-left">
          <h1>Kontaktirajte nas</h1>
          <p>
            Tu smo za sva vaša pitanja, porudžbine i sugestije.
            <br />
            Pišite nam sa poverenjem!
          </p>

          <div className="contact-info-list">
            <div><PhoneCall /><span>{SITE.phoneDisplay}<br />Ponedeljak - Petak: 09h – 17h</span></div>
            <div><Mail /><span>{SITE.email}<br />Odgovaramo u roku od 24h</span></div>
            <div><MapPin /><span>{SITE.address}</span></div>
          </div>

          <div className="socials">
            <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href={SITE.socials.pinterest} target="_blank" rel="noopener noreferrer"><FaPinterestP /></a>
            <a href={`mailto:${SITE.email}`}><Mail /></a>
          </div>
        </div>

        <div className="contact-right">
          <div className="form-side">
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Vaše ime"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Vaš email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                name="phone"
                placeholder="Telefon (opciono)"
                value={formData.phone}
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Poruka"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? 'SLANJE...' : 'POŠALJI PORUKU'}
              </button>

              {success && <p className="contact-success">{success}</p>}
              {error && <p className="contact-error">{error}</p>}
            </form>
          </div>

          <div className="image-side">
            <img src={contactToys} alt="Heklane igračke" />
          </div>
        </div>
      </section>
      <CollaborationBanner />
      <section className="contact-bottom container">
        <div className="faq-card">
          <h2>Najčešća pitanja</h2>

          <div className="faq-box">
            <div className="faq-decoration">♡</div>

            <details>
              <summary>Kako mogu da poručim?</summary>
              <p>Proizvod možete poručiti direktno kroz prodavnicu ili putem kontakt forme.</p>
            </details>

            <details>
              <summary>Koji su načini plaćanja?</summary>
              <p>Plaćanje je moguće pouzećem ili uplatom na račun.</p>
            </details>

            <details>
              <summary>Kada će moja porudžbina biti isporučena?</summary>
              <p>Rok isporuke zavisi od dostupnosti proizvoda i obično je 2-5 radnih dana.</p>
            </details>

            <details>
              <summary>Da li mogu da vratim proizvod?</summary>
              <p>Da, povrat je moguć u skladu sa uslovima kupovine.</p>
            </details>
          </div>
        </div>

        <div className="delivery-card">
          <div className="delivery-content">
            <div className="delivery-row">
              <HeartHandshake />
              <div>
                <h3>BESPLATNA DOSTAVA</h3>
                <p>Za porudžbine preko 5000 RSD</p>
              </div>
            </div>

            <div className="delivery-row">
              <Gift />
              <div>
                <h3>PAKOVANJE</h3>
                <p>Svaki proizvod pažljivo pakujemo i spremamo za poklon.</p>
              </div>
            </div>
          </div>

          <div className="gift-image"></div>
        </div>
      </section>
    </main>
  )
}