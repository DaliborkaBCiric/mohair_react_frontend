import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../services/api'
import { formatDate } from '../utils/common'
import '../styles/blog-post.css'
import instagram from '../assets/svg_icons/instagram.svg'
import { SITE } from '../confg/config.js'
import CollaborationBanner from '../components/banners/CollaborationBanner.jsx'

export default function BlogPost() {
	const { slug } = useParams()
	const [post, setPost] = useState(null)
	const [categories, setCategories] = useState([])
	const [latestPosts, setLatestPosts] = useState([])

	useEffect(() => {
		if (!slug) return

		async function loadData() {
			try {
				const latestPostsData = await api.getLatestBlogPosts()
				const [postData, categoriesData] = await Promise.all([
					api.getBlogPost(slug),
					api.getBlogCategories(),
					api.getLatestBlogPosts(),
				])

				setPost(postData)
				setCategories(categoriesData)
				setLatestPosts(latestPostsData.filter((p) => p.slug !== slug))

			} catch (error) {
				console.error(error)
			}
		}

		loadData()
	}, [slug])
	if (!post) {
		return <p>Učitavanje...</p>
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
							{categories.map((category) => (
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

							{latestPosts.map((item) => (
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
							<div className="instagram-card">

								<img src={instagram} alt="instagram" />
								<h3>Pratite nas</h3>

								<span className="instagram-handle">
									@mohair.studio
								</span>

								<p>
									za još inspiracije i novosti!
								</p>

								<span className="instagram-heart">♡</span>
							</div>
						</a>
						<CollaborationBanner />
					</aside>
				</div>
			</div>
		</main>
	)
}