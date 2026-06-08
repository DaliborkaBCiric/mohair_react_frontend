import { useMemo, useState } from 'react'
import { categories, products } from '../data/mockData.js'
import ProductGrid from '../components/product/ProductGrid.jsx'

export default function ShopPage() {
  const [category, setCategory] = useState('Svi proizvodi')
  const filtered = useMemo(() => category === 'Svi proizvodi' ? products : products.filter((p) => p.category === category), [category])

  return (
    <section className="page container">
      <div className="page-title"><span>Prodavnica</span><h1>Gotovi ručno rađeni proizvodi</h1><p>Setovi za bebe, amigurumi igračke, vunene čarape, dekice i još mnogo toga.</p></div>
      <div className="shop-layout">
        <aside className="filters">
          <h3>Kategorije</h3>
          {['Svi proizvodi', ...categories.map((c) => c.name)].map((name) => <button className={category === name ? 'active' : ''} onClick={() => setCategory(name)} key={name}>{name}</button>)}
        </aside>
        <ProductGrid products={filtered} />
      </div>
    </section>
  )
}
