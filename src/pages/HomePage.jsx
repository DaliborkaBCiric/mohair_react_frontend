import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { Mail, Heart, Gift, MoveRight } from 'lucide-react'
import ProductCarousel from '../components/product/ProductCarousel.jsx'
import Button from '../components/ui/Button.jsx'
import heartIcon from '../assets/heart-icon.png'
import HeartIcon from "../assets/icon_heart.png";
import GiftIcon from "../assets/icon_gift.png";
import Leaf from "../assets/icon_leaf.png";
import TruckIcon from "../assets/icon_truck.png";
import CollaborationBanner from '../components/banners/CollaborationBanner.jsx'

export default function HomePage() {

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setLoading(true)
      setSuccess('')
      setError('')

      const data = await api.subscribeNewsletter(email)

      setSuccess(data.message)
      setEmail('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    loadCategories()
    loadProducts()
  }, [])

  async function loadCategories() {
    try {
      const data = await api.getCategories()
      setCategories(data)
    } catch (error) {
      console.error('Greška pri učitavanju kategorija:', error)
    } finally {
      setLoadingCategories(false)
    }
  }

  async function loadProducts() {
    try {
      setLoadingProducts(true)

      const data = await api.getProducts()

      setProducts(data)
    } catch (error) {
      console.error('Greška pri učitavanju proizvoda:', error)
    } finally {
      setLoadingProducts(false)
    }
  }

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <div className='eyebrowDiv'>
              <span className="eyebrow">RUČNO RAĐENO <img src={heartIcon} alt="Icon-heart" /></span>
            </div>
            <h1>
              Sa ljubavlju.
              <span>Za najdraže.</span>
            </h1>
            <p>
              Unikatni, pažljivo izrađeni proizvodi koji greju srca i stvaraju uspomene.
            </p>

            <Link to="/prodavnica">
              <Button>Pogledaj ponudu</Button>
            </Link>
          </div>
        </div>

        <div className="benefits">
          <div className="benefit-item">
            <img src={HeartIcon} alt="" />
            <b>RUČNI RAD</b>
            <span>Sa ljubavlju</span>
          </div>

          <div className="benefit-item">
            <img src={Leaf} alt="leaf" />
            <b>PRIRODNI MATERIJALI</b>
            <span>Pamuk & vuna</span>
          </div>

          <div className="benefit-item">
            <img src={GiftIcon} alt="" />
            <b>POKLON PAKOVANJE</b>
            <span>Spremno za darivanje</span>
          </div>

          <div className="benefit-item">
            <img src={TruckIcon} alt="" />
            <b>BESPLATNA DOSTAVA</b>
            <span>Za porudžbine preko 5000 RSD</span>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-title">
          <h2>Kategorije</h2>
        </div>
        <div className="category-grid">
          {loadingCategories ? (
            <p>Učitavanje...</p>
          ) : (
            categories.map((category) => (
              <Link
                className="category-card"
                to={`/prodavnica?category=${category.slug}`}
                key={category.id}
              >
                <img src={`${category.image}`} alt={category.name} />

                <h3>{category.name}</h3>

                <button className="btn-soft">
                  Pogledaj
                </button>
              </Link>
            ))
          )}
        </div>
      </section>
      <CollaborationBanner />
      <section className="section container">
        <div className="section-header">
          <div className="section-title">
            <h2>Najprodavaniji proizvodi</h2>
          </div>

          <Link to="/prodavnica" className="section-link">
            Pogledaj sve proizvode <MoveRight color='#d99c9a' />
          </Link>
        </div>
        <ProductCarousel products={products.slice(0, 8)} />
      </section>
      <section className="promo-section container">
        <div className="promo-card">
          <div className="promo-icon">
            <Gift strokeWidth={1} />
          </div>

          <div className="promo-content">
            <h3>POKLON PAKOVANJE</h3>

            <p>
              Svaki proizvod dolazi pažljivo zapakovan,
              spreman za darivanje.
            </p>
          </div>
        </div>

        <div className="promo-card promo-newsletter">
          <div className="promo-icon">
            <Mail strokeWidth={1} />
          </div>

          <div className="promo-content">
            <h3>10% POPUSTA</h3>

            <p>
              Prijavite se na naš newsletter
              i ostvarite 10% popusta na prvu porudžbinu.
            </p>

            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Tvoja email adresa"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? 'Slanje...' : 'Prijavi se'}
              </button>
            </form>
            {success && <p className="newsletter-success">{success}</p>}
            {error && <p className="newsletter-error">{error}</p>}
          </div>
        </div>

        <div className="promo-card">
          <div className="promo-icon">
            <Heart strokeWidth={1} color='#e7b1ae' />
          </div>

          <div className="promo-content">
            <h3>RUČNI RAD SA LJUBAVLJU</h3>

            <p>
              Svaki komad je unikatan i nastao
              sa posebnom pažnjom.
            </p>

            <a href="/o-nama">O NAMA →</a>
          </div>
        </div>
      </section>
    </>
  )
}
