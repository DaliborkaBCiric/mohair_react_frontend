import { useMemo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'
import "../styles/shop.css";
import ProductGrid from '../components/product/ProductGrid.jsx'
import allIcon from '../assets/all_categories.png'
import { SlidersHorizontal } from "lucide-react"
import CollaborationBanner from '../components/banners/CollaborationBanner.jsx';

export default function ShopPage() {

  const [category, setCategory] = useState(0)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [maxPrice, setMaxPrice] = useState(8000)
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState('newest')

  function closeFilters() {
    setFiltersOpen(false)
  }

  const materials = useMemo(() => {
    return [...new Set(products.map(p => p.material).filter(Boolean))]
  }, [products])

  function toggleMaterial(material) {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(item => item !== material)
        : [...prev, material]
    )
  }

  const maxProductPrice = useMemo(() => {
    return Math.max(
      0,
      ...products.map((p) => p.sale_price || p.price)
    )
  }, [products])


  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      const productPrice = p.sale_price || p.price

      const matchCategory =
        category === 0 || p.category_id === category

      const matchPrice =
        productPrice <= maxPrice

      const matchMaterial =
        selectedMaterials.length === 0 ||
        selectedMaterials.includes(p.material)

      return matchCategory && matchPrice && matchMaterial
    })

    return [...result].sort((a, b) => {
      const priceA = a.sale_price || a.price
      const priceB = b.sale_price || b.price

      if (sortBy === 'price_asc') return priceA - priceB
      if (sortBy === 'price_desc') return priceB - priceA
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name)
      if (sortBy === 'name_desc') return b.name.localeCompare(a.name)
      if (sortBy === 'bestseller') return Number(b.is_bestseller) - Number(a.is_bestseller)

      return b.id - a.id
    })
  }, [products, category, maxPrice, selectedMaterials, sortBy])

  useEffect(() => {
    loadCategories()
    loadProducts()
  }, [])

  useEffect(() => {
    if (maxProductPrice > 0) {
      setMaxPrice(maxProductPrice)
    }
  }, [maxProductPrice])

  async function loadProducts() {
    try {
      setLoadingProducts(true)

      const data = await api.getProducts()

      setProducts(data)
    } catch (error) {
      console.error('Greška pri učitavanju proizvoda:', error)
    } finally {
      setLoadingProducts(false)
    }
  }

  async function loadCategories() {
    try {
      const data = await api.getCategories()
      setCategories(data)
    } catch (error) {
      console.error('Greška pri učitavanju kategorija:', error)
    } finally {
      setLoadingCategories(false)
    }
  }

  const categoryCounts = useMemo(() => {
    const counts = {}

    products.forEach(product => {
      counts[product.category_id] =
        (counts[product.category_id] || 0) + 1
    })

    return counts
  }, [products])

  return (
    <>
      <section className="shop-header">
        <div className="shop-header__intro">
          <h1>Prodavnica</h1>
          <p>
            Otkrijte pažljivo izrađene proizvode za bebe, amigurumi igračke,
            vunene čarape i još mnogo toga.
          </p>
        </div>

        <nav className="shop-categories">
          <a href="#" className={`shop-category ${category === 0 ? 'active' : ''}`} onClick={(e) => {
            e.preventDefault()
            setCategory(0)
          }}>
            <span className="shop-category__icon"><img width="80px" src={allIcon} alt="sve kategorie" /></span>
            <span>Svi proizvodi</span>
          </a>

          {categories.map(c => (
            <a href="#" key={c.id} className={`shop-category ${category === c.id ? 'active' : ''}`} onClick={(e) => {
              e.preventDefault()
              setCategory(c.id)
            }}
            >
              <span className="shop-category__icon"><img width="60px" src={`src/assets/${c.icon}`} alt='set' /></span>
              <span>{c.name}</span>
            </a>
          ))}

        </nav>
      </section>
      <section className="page container">
        <div className='top-filter'>
          <button
            className="btn-soft"
            onClick={() => setFiltersOpen(true)}
          >
            <SlidersHorizontal /> Filteri
          </button>
          <div className="shop-toolbar">
            <label htmlFor="sort">Sortiraj po:</label>

            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Najnovije</option>
              <option value="bestseller">Najprodavanije</option>
              <option value="price_asc">Cena: niža ka višoj</option>
              <option value="price_desc">Cena: viša ka nižoj</option>
              <option value="name_asc">Naziv: A-Z</option>
              <option value="name_desc">Naziv: Z-A</option>
            </select>
          </div>
        </div>

        <div className="shop-layout">
          {filtersOpen && (
            <div className="filter-overlay" onClick={closeFilters}></div>
          )}
          <aside className={`shop-sidebar ${filtersOpen ? 'open' : ''}`}>
            <button className="filter-close" onClick={closeFilters}>
              ×
            </button>

            <section className="filter-section">
              <h3>Kategorije</h3>
              <ul className="category-list">
                {[
                  { id: 0, name: 'Svi proizvodi' },
                  ...categories
                ].map(cat => {
                  const count =
                    cat.id === 0
                      ? products.length
                      : (categoryCounts[cat.id] || 0)

                  return (
                    <li key={cat.id}>
                      <a
                        className={category === cat.id ? 'active' : ''}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setCategory(cat.id)
                          closeFilters()
                        }}
                      >
                        {cat.name}
                        <span>({count})</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </section>

            <section className="filter-section">
              <h3>Cena</h3>

              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max={maxProductPrice}
                  value={maxPrice}
                  onChange={(e) => { setMaxPrice(Number(e.target.value)) }}
                />
                <div className="price-values">
                  <span>0 RSD</span>
                  <span>{maxPrice.toLocaleString('sr-RS')} RSD</span>
                </div>
              </div>
            </section>

            <section className="filter-section">
              <h3>Materijal</h3>

              {materials.map(material => (
                <label className="checkbox-item" key={material}>
                  <input
                    type="checkbox"
                    checked={selectedMaterials.includes(material)}
                    onChange={() => {
                      toggleMaterial(material)
                      closeFilters()
                    }}
                  />
                  <span>{material}</span>
                </label>
              ))}
            </section>
            <CollaborationBanner />
          </aside>
          <ProductGrid products={filtered} />
        </div>
      </section>
    </>
  )
}
