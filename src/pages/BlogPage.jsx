import { useMemo, useState, useEffect } from 'react'
import { api } from '../services/api'
import '../styles/blog.css'

export default function Blog() {

  const [posts, setPosts] = useState([])
  const [category, setCategory] = useState(0)
  const [blogCategories, setBlogCategories] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [loadingPosts, setLoadingPosts] = useState(true)

  async function loadBlogCategories() {
    try {
      const data = await api.getBlogCategories()

      setBlogCategories(data)
    } catch (error) {
      console.error(error)
    }
  }


  async function loadPosts() {
    try {
      const data = await api.getBlogPosts()

      setPosts(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadBlogCategories()
    loadPosts()
  }, [])

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('sr-RS', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const filtered = useMemo(() => {
    return posts.filter((p) => category === 0 || p.category_id === category)
  }, [posts, category])

  console.log(filtered)


  return (
    <main className="blog-page">
      <div className="blog-container">
        <section className="blog-header">
          <h1>Blog</h1>
          <p>Saveti, ideje i inspiracija iz sveta ručnog rada.</p>
        </section>

        <div className="blog-tabs">
          <button className={`${category === 0 ? 'active' : ''}`} onClick={(e) => {
            e.preventDefault()
            setCategory(0)
          }}>Svi članci</button>
          {blogCategories.map(bp =>
            <button className={`${category === bp.id ? 'active' : ''}`} onClick={(e) => {
              e.preventDefault()
              setCategory(bp.id)
            }} key={bp.id}>{bp.name}</button>
          )}
        </div>

        <section className="blog-grid">
          {filtered.length === 0 ? (
            <div className="blog-empty">
              <h3>Trenutno nema članaka</h3>
              <p>Za izabranu kategoriju još uvek nisu objavljeni članci.</p>
            </div>
          ) : (filtered.map((post) => (
            <article className="blog-card" key={post.title}>
              <a href={`/blog/${post.slug}`} className="blog-card-image">
                <img src={post.featured_image} alt={post.title} />
              </a>
              <div className="blog-card-body">
                <span className="blog-card-category">{blogCategories.find(c => c.id === post.category_id)?.name}</span>
                <h2 className="blog-card-title"><a href={`/blog/${post.slug}`}>{post.title}</a></h2>
                <p className="blog-card-text">{post.excerpt}</p>

                <a href={`/blog/${post.slug}`} className="blog-card-link">
                  Pročitaj više <span>→</span>
                </a>

                <time className="blog-card-date">{formatDate(post.published_at)}</time>
              </div>
            </article>
          )))}
        </section>
      </div>
    </main >
  )
}