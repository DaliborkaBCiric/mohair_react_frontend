import { posts } from '../data/mockData.js'
export default function BlogPage() {
  return <section className="page container"><div className="page-title"><span>Blog</span><h1>Saveti, ideje i inspiracija</h1></div><div className="blog-grid">{posts.map((post) => <article className="blog-card" key={post.id}><img src={post.image} /><span>{post.category}</span><h3>{post.title}</h3><p>{post.excerpt}</p><small>{post.date}</small></article>)}</div></section>
}
