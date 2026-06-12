import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'

import '../styles/materials.css'

export default function MaterialsPage() {
	const [materials, setMaterials] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		loadMaterials()
	}, [])

	async function loadMaterials() {
		try {
			const data = await api.getMaterials()
			setMaterials(data)
		} catch (error) {
			console.error('Greška pri učitavanju materijala:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<main className="materials-page">
			{/* HERO */}

			<section className="materials-hero">
				<div className="materials-hero-content">
					<h1>Materijali</h1>

					<div className="materials-title-divider">
						<span />
						<small>♡</small>
						<span />
					</div>

					<p>
						Pažljivo birani prirodni materijali
						<br />
						koji pružaju mekoću, udobnost i dugotrajnost
						<br />
						svakom našem proizvodu.
					</p>

					<div className="materials-leaf">❦</div>
				</div>
			</section>

			{/* LISTA MATERIJALA */}

			<section className="materials-list-section container">
				<div className="section-title-wrapper">
					<div className="section-title">
						<h2>Svi materijali</h2>
					</div>

					<div className="section-heart">♥</div>
				</div>
				{loading ? (
					<p className="materials-status">
						Učitavanje materijala...
					</p>
				) : (
					<div className="materials-grid">
						{materials.map((material) => (
							<Link
								key={material.id}
								to={`/materijal/${material.slug}`}
								className="material-card"
							>
								<div className="material-card-image">
									<img
										src={material.featured_image}
										alt={material.name}
									/>
								</div>

								<div className="material-card-body">
									<h3>{material.name}</h3>

									<p>{material.short_description}</p>

									<strong>
										SAZNAJ VIŠE →
									</strong>
								</div>
							</Link>
						))}
					</div>
				)}

				{/* DONJI BANNER */}


			</section>
			<section className="materials-care-banner">
				<div className="materials-care-content">
					<div className="materials-care-icon">
						♡
					</div>

					<p>
						Biramo samo materijale koje bismo koristili za svoje najdraže.
						<br />
						Zato su svi naši proizvodi nežni, bezbedni i napravljeni sa ljubavlju.
					</p>
				</div>

				<div className="materials-care-image" />
			</section>
		</main>
	)
}