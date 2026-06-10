import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../services/api'
import { useAppData } from '../context/AppDataContext'
import { formatDate } from '../utils/common'
import '../styles/blog-post.css'
import instagram from '../assets/svg_icons/instagram.svg'
import { SITE } from '../confg/config.js'
import CollaborationBanner from '../components/banners/CollaborationBanner.jsx'

export default function BlogPost() {
	const { slug } = useParams()

	const {
		blogCategories,
		latestPosts,
		loading
	} = useAppData()

	const [post, setPost] = useState(null)
	const [loadingPost, setLoadingPost] = useState(true)

	useEffect(() => {
		if (!slug) return

		async function loadPost() {
			try {
				setLoadingPost(true)

				const postData = await api.getBlogPost(slug)

				setPost(postData)
			} catch (error) {
				console.error(error)
			} finally {
				setLoadingPost(false)
			}
		}

		loadPost()
	}, [slug])

	const filteredLatestPosts = useMemo(() => {
		return latestPosts.filter((p) => p.slug !== slug)
	}, [latestPosts, slug])

	if (loading || loadingPost) {
		return <p>Učitavanje...</p>
	}

	if (!post) {
		return <p>Post nije pronađen.</p>
	}

	return (
		<main className="blog-post-page">
			<div className="blog-post-container">
				<div className="blog-post-layout">
					<article className="blog-post-content">
						<div className="post-meta">
							<span>NOVOSTI</span>
							<span>•</span>
							<span>{formatDate(post.published_at)}</span>
						</div>

						<h1>{post.title}</h1>
						<div className="title-heart">♡</div>

						<p className="post-intro">
							{post.excerpt}
						</p>

						<img
							className="post-hero-image"
							src={post.featured_image}
							alt={post.title}
						/>

						<div
							className="post-body"
							dangerouslySetInnerHTML={{ __html: post.content }}
						/>
					</article>

					<aside className="blog-sidebar">
						<section className="sidebar-card">
							<h3>Kategorije</h3>

							{blogCategories.map((category) => (
								<Link
									key={category.id}
									to={`/blog?category=${category.id}`}
								>
									{category.name}
								</Link>
							))}
						</section>

						<section className="sidebar-card">
							<h3>Istaknuti postovi</h3>

							{filteredLatestPosts.map((item) => (
								<Link
									key={item.id}
									to={`/blog/${item.slug}`}
									className="featured-post"
								>
									<img
										src={item.featured_image}
										alt={item.title}
									/>

									<span>
										<strong>{item.title}</strong>

										<small>
											{formatDate(item.published_at)}
										</small>
									</span>
								</Link>
							))}
						</section>

						<a
							href={SITE.socials.instagram}
							target="_blank"
							rel="noreferrer"
							className="instagram-card"
						>
							<img src={instagram} alt="instagram" />

							<h3>Pratite nas</h3>

							<span className="instagram-handle">
								@mohair.studio
							</span>

							<p>
								za još inspiracije i novosti!
							</p>

							<span className="instagram-heart">♡</span>
						</a>

						<CollaborationBanner />
					</aside>
				</div>
			</div>
		</main>
	)
}