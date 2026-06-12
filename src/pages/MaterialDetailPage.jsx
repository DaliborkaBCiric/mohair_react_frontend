import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { api } from '../services/api'
import '../styles/material-detail.css'

export default function MaterialDetailPage() {
	const { slug } = useParams()
	const [material, setMaterial] = useState(null)
	const [loading, setLoading] = useState(true)

	const careItems = material?.care_instructions
		? material.care_instructions
			.split('.')
			.map((item) => item.trim())
			.filter(Boolean)
		: []

	const idealForItems = material?.ideal_for
		? material.ideal_for
			.split(',')
			.map((item) => item.trim().replace(/\.$/, ''))
			.filter(Boolean)
		: []

	useEffect(() => {
		async function loadMaterial() {
			try {
				const data = await api.getMaterial(slug)
				setMaterial(data)
			} catch (error) {
				console.error('Greška pri učitavanju materijala:', error)
			} finally {
				setLoading(false)
			}
		}

		loadMaterial()
	}, [slug])

	if (loading) return <p className="material-status">Učitavanje...</p>
	if (!material) return <p className="material-status">Materijal nije pronađen.</p>

	return (
		<main className="material-detail-page">
			<section className="material-detail container">
				<nav className="material-breadcrumb">
					<Link to="/">Početna</Link>
					<span>›</span>
					<Link to="/materijali">Materijali</Link>
					<span>›</span>
					<span>{material.name}</span>
				</nav>

				<div className="material-detail-grid">
					<div className="material-detail-image">
						<img src={material.featured_image} alt={material.name} />
					</div>

					<div className="material-detail-content">
						<h1>{material.name}</h1>

						<div className="material-title-divider">
							<span />
							<small>♡</small>
							<span />
						</div>

						<p className="material-description">
							{material.description}
						</p>

						<div className="material-features-grid">
							{material.features?.map((feature) => {
								const Icon = Icons[feature.icon] || Icons.Sparkles

								return (
									<div className="material-feature" key={feature.id}>
										<Icon size={32} strokeWidth={1.4} />

										<div>
											<h3>{feature.title}</h3>
											<p>{feature.description}</p>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</section>
			<section className="material-info-section">
				<div className="material-care">
					<h2>Nega</h2>

					<div className="care-list">
						{careItems.map((item, index) => (
							<div className="care-item" key={index}>
								<span>{index + 1}</span>
								<p>{item}.</p>
							</div>
						))}
					</div>
				</div>

				<div className="material-ideal">
					<h2>Idealno za</h2>

					<ul>
						{idealForItems.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</div>

				<div
					className="material-info-image"
					style={{
						backgroundImage: `
        linear-gradient(
          90deg,
          rgba(255, 250, 247, 0.7) 0%,
          rgba(255, 250, 247, 0) 35%
        ),
        url(${material.material_products_image})
      `
					}}
				/>
			</section>
			<section className="material-products-banner">
				<div className="material-products-image" />

				<div className="material-products-content">
					<div className="material-products-heart">♡</div>

					<h2>Zašto {material.name}?</h2>

					<p>
						{material.adventages}
					</p>

					<Link to="/prodavnica?material=mohair" className="material-products-btn">
						Pogledajte proizvode od mohaira
					</Link>
				</div>
			</section>
		</main>
	)
}