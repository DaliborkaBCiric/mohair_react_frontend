import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  return (
    <div className="product-card">
      <>
        <a href={`/proizvod/${product.slug}`}>
          <div className="product-images">
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
          </div>

          <div className="product-info">
            <h3>{product.name}</h3>
            <p>{product.material}</p>

            <div className="product-bottom">
              <strong>
                {(product.sale_price || product.price).toLocaleString("sr-RS")} {product.currency}
              </strong>

              <button className="cart-btn" type="button">🛍</button>
            </div>
          </div>
        </a>
      </>
    </div >
  )
}
