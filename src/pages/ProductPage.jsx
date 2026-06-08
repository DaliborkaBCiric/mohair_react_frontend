import { useParams } from 'react-router-dom'
import { products } from '../data/mockData.js'
import { useCart } from '../context/CartContext.jsx'
import Button from '../components/ui/Button.jsx'

export default function ProductPage() {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug) || products[0]
  const { addToCart } = useCart()

  return (
    <section className="page container product-detail">
      <img src={product.image} alt={product.name} />
      <div>
        <span className="eyebrow">{product.category}</span>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <strong>{product.price.toLocaleString('sr-RS')} RSD</strong>
        <Button onClick={() => addToCart(product)}>Dodaj u korpu</Button>
      </div>
    </section>
  )
}
