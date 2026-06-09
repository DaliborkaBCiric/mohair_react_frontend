import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Heart,
  ShoppingBag,
  Search,
  Truck,
  Gift,
  RotateCcw,
  Leaf,
  Palette,
  CheckCircle,
  HandHeart,
} from 'lucide-react'
import { api } from '../services/api'
import "../styles/product.css"

export default function ProductPage() {
  const { slug } = useParams()

  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true)

        const data = await api.getProduct(slug)
        setProduct(data)

        const mainImage =
          data.images?.find(image => image.is_main) ||
          data.images?.[0] ||
          null

        setSelectedImage(mainImage)
      } catch (error) {
        console.error('Greška pri učitavanju proizvoda:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [slug])

  useEffect(() => {
    async function loadCategories() {
      const data = await api.getCategories()
      setCategories(data)
    }

    loadCategories()
  }, [])

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
                  className={`thumbnail-btn ${selectedImage?.id === image.id ? 'active' : ''
                    }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={`${image.image_path}`}
                    alt={image.alt_text || product.name}
                  />
                </button>
              ))}
            </div>

            <div className="product-main-image">
              {selectedImage && (
                <img
                  src={`${selectedImage.image_path}`}
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

            {console.log(product)}
            <span className="product-category">
              {category?.name || category?.name || 'Proizvod'}
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

              <button className="add-to-cart-btn" type="button">
                <ShoppingBag size={19} />
                Dodaj u korpu
              </button>
            </div>

            <div className="product-benefits">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <Truck size={23} />
                </div>
                <p>
                  <strong>Besplatna dostava</strong>
                  <span>preko 60€</span>
                </p>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <Gift size={23} />
                </div>
                <p>
                  <strong>Pažljivo pakovanje</strong>
                  <span>svakog proizvoda</span>
                </p>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <RotateCcw size={23} />
                </div>
                <p>
                  <strong>Mogućnost zamene</strong>
                  <span>u roku od 14 dana</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}