import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const [showMessage, setShowMessage] = useState(false)
  const { addToCart } = useCart()

  function handleAddToCart() {
    addToCart(product, 1)
    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 3000)
  }

  return (
    <div className="product-card">
      <div className="product-images">
        <Link to={`/proizvod/${product.slug}`}>
          {product.images?.map((image) => (
            <img
              key={image.id}
              src={image.image_path}
              alt={image.alt_text || product.name}
            />
          ))}

          {product.is_new && <span className="product-badge">Novo</span>}
          {product.is_bestseller && <span className="product-badge">Top</span>}
        </Link>

        <button className="wishlist-btn" type="button">♡</button>
      </div>

      <div className="product-info">
        <Link to={`/proizvod/${product.slug}`}>
          <h3>{product.name}</h3>
        </Link>

        <p>{product.material}</p>

        <div className="product-bottom">
          <strong>
            {Number(product.sale_price || product.price).toLocaleString('sr-RS')} {product.currency}
          </strong>

          <button className="cart-btn" type="button" onClick={handleAddToCart}>
            <ShoppingBag size="18" />
          </button>
        </div>
      </div>

      {showMessage && (
        <div className="cart-message">
          Proizvod je dodat u korpu
        </div>
      )}
    </div>
  )
}
