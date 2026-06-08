import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  return (
    <article className="product-card">
      {product.badge && <span className="badge">{product.badge}</span>}
      <button className="heart"><Heart size={18} /></button>
      <Link to={`/proizvod/${product.slug}`}><img src={product.image} alt={product.name} /></Link>
      <div className="product-info">
        <Link to={`/proizvod/${product.slug}`}><h3>{product.name}</h3></Link>
        <p>{product.category}</p>
        <strong>{product.price.toLocaleString('sr-RS')} RSD</strong>
        <button className="add-cart" onClick={() => addToCart(product)}><ShoppingBag size={17} /> Dodaj</button>
      </div>
    </article>
  )
}
