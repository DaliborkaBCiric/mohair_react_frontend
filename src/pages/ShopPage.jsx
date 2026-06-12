import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppData } from '../context/AppDataContext'
import "../styles/shop.css"
import ProductGrid from '../components/product/ProductGrid.jsx'
import allIcon from '../assets/all_categories.png'
import amigurumiIcon from '../assets/amigurumi_icon.png'
import blanketIcon from '../assets/blanket_icon.png'
import setIcon from '../assets/set_icon.png'
import socksIcon from '../assets/socks_icon.png'
import { SlidersHorizontal } from "lucide-react"
import CollaborationBanner from '../components/banners/CollaborationBanner.jsx'

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'dj')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getCategorySlug(category) {
  return category?.slug || slugify(category?.name)
}

const categoryIconMap = {
  'amigurumi_icon.png': amigurumiIcon,
  'blanket_icon.png': blanketIcon,
  'set_icon.png': setIcon,
  'socks_icon.png': socksIcon,
}

function getCategoryIcon(icon) {
  return categoryIconMap[icon] || allIcon
}

export default function ShopPage() {
  const { products, categories, loading } = useAppData()

  const [searchParams, setSearchParams] = useSearchParams()
  const selectedCategory = searchParams.get('category') || ''

  const [maxPrice, setMaxPrice] = useState(8000)
  const [selectedMaterials, setSelectedMaterials] = useState([])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState('newest')

  function closeFilters() {
    setFiltersOpen(false)
  }

  const materials = useMemo(() => {
    return [...new Set(products.map(p => p.material.name).filter(Boolean))]
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

  useEffect(() => {
    if (maxProductPrice > 0) {
      setMaxPrice(maxProductPrice)
    }
  }, [maxProductPrice])

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      const productPrice = p.sale_price || p.price
      const productCategory = categories.find((c) => c.id === p.category_id)

      const matchCategory =
        !selectedCategory || getCategorySlug(productCategory) === selectedCategory

      const matchPrice =
        productPrice <= maxPrice

      const matchMaterial =
        selectedMaterials.length === 0 ||
        selectedMaterials.includes(p.name)

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
  }, [products, categories, selectedCategory, maxPrice, selectedMaterials, sortBy])

  const categoryCounts = useMemo(() => {
    const counts = {}

    products.forEach(product => {
      counts[product.category_id] =
        (counts[product.category_id] || 0) + 1
    })

    return counts
  }, [products])

  if (loading) {
    return <p>Učitavanje...</p>
  }

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
          <button
            type="button"
            className={`shop-category ${!selectedCategory ? 'active' : ''}`}
            onClick={() => setSearchParams({})}
          >
            <span className="shop-category__icon">
              <img width="80px" src={allIcon} alt="Sve kategorije" />
            </span>
            <span>Svi proizvodi</span>
          </button>

          {categories.map(c => (
            <button
              type="button"
              key={c.id}
              className={`shop-category ${selectedCategory === getCategorySlug(c) ? 'active' : ''}`}
              onClick={() => setSearchParams({ category: getCategorySlug(c) })}
            >
              <span className="shop-category__icon">
                <img width="60px" src={getCategoryIcon(c.icon)} alt={c.name} />
              </span>
              <span>{c.name}</span>
            </button>
          ))}
        </nav>
      </section>

      <section className="page container">
        <div className="top-filter">
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
            <div
              className="filter-overlay"
              onClick={closeFilters}
            />
          )}

          <aside className={`shop-sidebar ${filtersOpen ? 'open' : ''}`}>
            <button
              className="filter-close"
              onClick={closeFilters}
            >
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
                        className={
                          cat.id === 0
                            ? !selectedCategory ? 'active' : ''
                            : selectedCategory === getCategorySlug(cat) ? 'active' : ''
                        }
                        href={cat.id === 0 ? '/prodavnica' : `/prodavnica?category=${getCategorySlug(cat)}`}
                        onClick={(e) => {
                          e.preventDefault()

                          if (cat.id === 0) {
                            setSearchParams({})
                          } else {
                            setSearchParams({ category: getCategorySlug(cat) })
                          }

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
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value))
                  }}
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