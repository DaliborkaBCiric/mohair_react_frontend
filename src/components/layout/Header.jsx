import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react'
import logo from '../../assets/logo-main.png'
import { useCart } from '../../context/CartContext.jsx'

export default function Header() {
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="top-bar">BESPLATNA DOSTAVA ZA PORUDŽBINE PREKO 60€ ♥</div>

      <div className="header-inner container">
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <img src={logo} alt="Mohair Studio" />
        </Link>

        <nav className={`main-menu ${open ? 'is-open' : ''}`}>
          <NavLink to="/" onClick={closeMenu}>Početna</NavLink>
          <NavLink to="/prodavnica" onClick={closeMenu} className="menu-with-icon">Proizvodi</NavLink>
          <NavLink to="/blog" onClick={closeMenu}>Blog</NavLink>
          <NavLink to="/o-nama" onClick={closeMenu}>O nama</NavLink>
          <NavLink to="/kontakt" onClick={closeMenu}>Kontakt</NavLink>
        </nav>

        <div className="nav-icons">
          <Link to="/korpa" className="cart-icon">
            <ShoppingBag size={24} />
            <span>{count}</span>
          </Link>

          <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={27} /> : <Menu size={27} />}
          </button>
        </div>
      </div>
    </header>
  )
}