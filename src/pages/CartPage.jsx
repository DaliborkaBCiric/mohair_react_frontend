import { useCart } from '../context/CartContext.jsx'
import Button from '../components/ui/Button.jsx'

export default function CartPage() {
  const { items, total, removeFromCart, clearCart } = useCart()
  return <section className="page container"><div className="page-title"><span>Korpa</span><h1>Vaša porudžbina</h1></div>{items.length === 0 ? <p>Korpa je prazna.</p> : <div className="cart-list">{items.map((item) => <div className="cart-row" key={item.id}><img src={item.image} /><div><h3>{item.name}</h3><p>Količina: {item.quantity}</p></div><strong>{(item.price * item.quantity).toLocaleString('sr-RS')} RSD</strong><button onClick={() => removeFromCart(item.id)}>Ukloni</button></div>)}<div className="cart-total"><strong>Ukupno: {total.toLocaleString('sr-RS')} RSD</strong><Button onClick={clearCart}>Pošalji porudžbinu</Button></div></div>}</section>
}
