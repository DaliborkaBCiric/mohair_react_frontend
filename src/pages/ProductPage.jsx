import { useMemo, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Heart,
  ShoppingBag,
  Search,
  Truck,
  Gift,
  RefreshCcw,
  Leaf,
  Palette,
  CheckCircle,
  HandHeart,
  RulerDimensionLine
} from 'lucide-react'
import { useAppData } from '../context/AppDataContext'
import { useCart } from '../context/CartContext.jsx'
import "../styles/product.css"
import yarnHart from '../assets/yarn-heart.png'

export default function ProductPage() {
  const { slug } = useParams()
  const { addToCart } = useCart()
  const { products, categories, loading } = useAppData()

  const [selectedImage, setSelectedImage] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('opis')

  const product = useMemo(() => {
    return products.find((item) => item.slug === slug) || null
  }, [products, slug])

  useEffect(() => {
    if (!product) return

    const mainImage =
      product.images?.find(image => image.is_main) ||
      product.images?.[0] ||
      null

    setSelectedImage(mainImage)
    setQuantity(1)
    setActiveTab('opis')
  }, [product])

  if (loading) {
    return <main className="product-detail-page">Učitavanje proizvoda...</main>
  }

  if (!product) {
    return <main className="product-detail-page">Proizvod nije pronađen.</main>
  }

  const category = categories.find(
    c => c.id === product.category_id
  )

  const images = product.images || []

  const tabs = [
    {
      id: 'opis',
      label: 'Opis',
      content:
        product?.description ||
        'Opis proizvoda trenutno nije dostupan.',
    },
    {
      id: 'info',
      label: 'Dodatne informacije',
      content:
        product?.additional_info ||
        'Materijal: moher i prirodna vuna. Svaki proizvod je ručno izrađen, pa su moguća blaga odstupanja.',
    },
    {
      id: 'care',
      label: 'Održavanje',
      content:
        product?.care_instructions ||
        'Preporučuje se ručno pranje u hladnoj vodi i sušenje na ravnoj površini.',
    },
  ]

  const activeContent = tabs.find((tab) => tab.id === activeTab)

  return (
    <>
      <nav className="breadcrumb">
        <Link to="/">Početna</Link>

        <span className="breadcrumb-separator">›</span>

        <Link to="/prodavnica">Prodavnica</Link>

        <span className="breadcrumb-separator">›</span>

        <span className="current">
          {product.name}
        </span>
      </nav>

      <main className="product-detail-page">
        <section className="product-detail-container">
          <div className="product-gallery">
            <div className="product-thumbnails">
              {images.map(image => (
                <button
                  key={image.id}
                  type="button"
                  className={`thumbnail-btn ${selectedImage?.id === image.id ? 'active' : ''}`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.image_path}
                    alt={image.alt_text || product.name}
                  />
                </button>
              ))}
            </div>

            <div className="product-main-image">
              {selectedImage && (
                <img
                  src={selectedImage.image_path}
                  alt={selectedImage.alt_text || product.name}
                />
              )}

              <button className="zoom-btn" type="button" aria-label="Uvećaj sliku">
                <Search size={18} />
              </button>
            </div>
          </div>

          <div className="product-info">
            <button className="favorite-btn" type="button">
              <Heart size={24} />
            </button>

            <span className="product-category">
              {category?.name || 'Proizvod'}
            </span>

            <h1>{product.name}</h1>

            <p className="product-price">
              {Number(product.price).toLocaleString('sr-RS')} RSD
            </p>

            <div className="product-line" />

            <p className="product-description">
              {product.description || 'Opis proizvoda trenutno nije dostupan.'}
            </p>

            <div className="product-specs">
              <div className="product-spec">
                <div className="spec-label">
                  <Leaf size={19} />
                  <span>Materijal:</span>
                </div>
                <strong>{product.material || '—'}</strong>
              </div>

              <div className="product-spec">
                <div className="spec-label">
                  <Palette size={19} />
                  <span>Boja:</span>
                </div>
                <strong>{product.color || '—'}</strong>
              </div>

              <div className="product-spec">
                <div className="spec-label">
                  <RulerDimensionLine size={19} />
                  <span>Veličina:</span>
                </div>
                <strong>{product.age_group || '—'}</strong>
              </div>

              <div className="product-spec">
                <div className="spec-label">
                  <CheckCircle size={19} />
                  <span>Dostupnost:</span>
                </div>
                <strong>
                  {product.stock_quantity > 0 ? 'Na stanju' : 'Trenutno nije dostupno'}
                </strong>
              </div>

              <div className="product-spec">
                <div className="spec-label">
                  <HandHeart size={19} />
                  <span>Izrada:</span>
                </div>
                <strong>Ručni rad</strong>
              </div>
            </div>

            <div className="product-actions">
              <div className="quantity-control">
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  +
                </button>
              </div>

              <button
                className="add-to-cart-btn"
                type="button"
                onClick={() => addToCart(product, quantity)}
                disabled={product.stock_quantity <= 0}
              >
                <ShoppingBag size={19} />
                Dodaj u korpu
              </button>
            </div>

            <section className="info-strip">
              <div className="info-item">
                <div className="info-icon">
                  <Truck size={26} strokeWidth={1.8} />
                </div>
                <div>
                  <h4>Besplatna dostava</h4>
                  <p>preko 5000 RSD</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Gift size={26} strokeWidth={1.8} />
                </div>
                <div>
                  <h4>Pažljivo pakovanje</h4>
                  <p>svakog proizvoda</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <RefreshCcw size={26} strokeWidth={1.8} />
                </div>
                <div>
                  <h4>Mogućnost zamene</h4>
                  <p>u roku od 14 dana</p>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section className="product-info-panel">
          <div className="product-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={activeTab === tab.id ? 'active' : ''}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="product-info-content">
            <p>{activeContent?.content}</p>

            <div className="handmade-note">
              <div className="handmade-icon">
                <img src={yarnHart} alt="" />
              </div>

              <div>
                <h4>Ručni rad sa ljubavlju</h4>
                <p>
                  Svaki komad je pažljivo i s ljubavlju napravljen u našem ateljeu.
                  Hvala što podržavate ručni rad. ♡
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}