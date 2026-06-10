import { Link } from 'react-router-dom'
import '../styles/cart.css'

export default function OrderSuccess() {
	return (
		<main className="cart-page">
			<section className="cart-hero success">
				<p className="section-eyebrow">HVALA VAM</p>
				<h1>Porudžbina je uspešno poslata</h1>
				<p>
					Uskoro ćemo vas kontaktirati radi potvrde porudžbine i dogovora oko
					isporuke.
				</p>

				<Link to="/prodavnica" className="cart-primary-btn">
					Nastavi kupovinu
				</Link>
			</section>
		</main>
	)
}