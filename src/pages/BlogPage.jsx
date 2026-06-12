import { useMemo, useState } from 'react'
import { useAppData } from '../context/AppDataContext'
import { formatDate } from '../utils/common'
import '../styles/blog.css'
import CollaborationBanner from '../components/banners/CollaborationBanner'

export default function Blog() {
  const { blogPosts, blogCategories, loading } = useAppData()
  const [category, setCategory] = useState(0)

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => category === 0 || p.category_id === category)
  }, [blogPosts, category])

  if (loading) {
    return <p>Učitavanje...</p>
  }

  return (
    <main className="blog-page">
      <div className="blog-container">
        <section className="blog-header">
          <h1>Blog</h1>
          <p>Saveti, ideje i inspiracija iz sveta ručnog rada.</p>
        </section>

        <div className="blog-tabs">
          <button
            className={category === 0 ? 'active' : ''}
            onClick={() => setCategory(0)}
          >
            Svi članci
          </button>

          {blogCategories.map((bp) => (
            <button
              className={category === bp.id ? 'active' : ''}
              onClick={() => setCategory(bp.id)}
              key={bp.id}
            >
              {bp.name}
            </button>
          ))}
        </div>

        <section className="blog-grid">
          {filtered.length === 0 ? (
            <div className="blog-empty">
              <h3>Trenutno nema članaka</h3>
              <p>Za izabranu kategoriju još uvek nisu objavljeni članci.</p>
            </div>
          ) : (
            filtered.map((post) => (
              <article className="blog-card" key={post.id}>
                <a href={`/blog/${post.slug}`} className="blog-card-image">
                  <img src={post.featured_image} alt={post.title} />
                </a>

                <div className="blog-card-body">
                  <span className="blog-card-category">
                    {blogCategories.find((c) => c.id === post.category_id)?.name}
                  </span>

                  <h2 className="blog-card-title">
                    <a href={`/blog/${post.slug}`}>{post.title}</a>
                  </h2>

                  <p className="blog-card-text">{post.excerpt}</p>

                  <a href={`/blog/${post.slug}`} className="blog-card-link">
                    Pročitaj više <span>→</span>
                  </a>

                  <time className="blog-card-date">
                    {formatDate(post.published_at)}
                  </time>
                </div>
              </article>
            ))
          )}
        </section>

        <CollaborationBanner />
      </div>
    </main>
  )
}