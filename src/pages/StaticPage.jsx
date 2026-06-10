import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../services/api'
import '../styles/static-page.css'

export default function StaticPage() {
	const { slug } = useParams()

	const [page, setPage] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	useEffect(() => {
		async function loadPage() {
			try {
				setLoading(true)
				setError(false)

				const data = await api.getPage(slug)
				setPage(data)
			} catch (err) {
				console.error(err)
				setError(true)
			} finally {
				setLoading(false)
			}
		}

		loadPage()
	}, [slug])

	if (loading) {
		return (
			<main className="static-page">
				<div className="container">
					<p>Učitavanje...</p>
				</div>
			</main>
		)
	}

	if (error || !page) {
		return (
			<main className="static-page">
				<div className="container">
					<h1>Stranica nije pronađena</h1>
					<p>Tražena stranica trenutno nije dostupna.</p>
				</div>
			</main>
		)
	}

	return (
		<main className="static-page">
			<section className="static-page-hero">
				<div className="container">
					<span className="static-page-eyebrow">Mohair Studio</span>
					<h1>{page.title}</h1>
				</div>
			</section>

			<section className="static-page-content">
				<div className="container static-page-container">
					<div
						className="static-page-body"
						dangerouslySetInnerHTML={{ __html: page.content }}
					/>
				</div>
			</section>
		</main>
	)
}