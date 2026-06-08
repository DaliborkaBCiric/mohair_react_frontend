import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Heart, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const [showMessage, setShowMessage] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)

    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 3000)
  }
  return (
    <div className="product-card">
      <div className="product-images">
        <a href={`/proizvod/${product.slug}`}>
          {product.images?.map((image) => (
            <img
              key={image.id}
              src={image.image_path}
              alt={image.alt_text || product.name}
            />
          ))}

          {product.is_new && <span className="product-badge">Novo</span>}
          {product.is_bestseller && <span className="product-badge">Top</span>}

          <button className="wishlist-btn" type="button">♡</button>
        </a>
      </div>

      <div className="product-info">
        <a href={`/proizvod/${product.slug}`}><h3>{product.name}</h3></a>
        <p>{product.material}</p>

        <div className="product-bottom">
          <strong>
            {(product.sale_price || product.price).toLocaleString("sr-RS")} {product.currency}
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
    </div >
  )
}
