import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import ShopPage from './pages/ShopPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import CartPage from './pages/CartPage.jsx'
// import BlogContentPage from './pages/BlogContentPage.jsx'

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/prodavnica" element={<ShopPage />} />
        <Route path="/proizvod/:slug" element={<ProductPage />} />
        <Route path="/o-nama" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        {/* <Route path="/blog/:slug" element={<BlogContentPage />} /> */}
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/korpa" element={<CartPage />} />
      </Routes>
    </MainLayout>
  )
}
