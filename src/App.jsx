import { Routes, Route } from 'react-router-dom'
import ComingSoonPage from './pages/ComingSoonPage'
import MainLayout from './components/layout/MainLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import ShopPage from './pages/ShopPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import CartPage from './pages/CartPage.jsx'
import BlogPostPage from './pages/BlogPostPage.jsx'
import Collaborate from './pages/Collaborate.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'
import StaticPage from './pages/StaticPage.jsx'
import MaterialsPage from './pages/MaterialsPage.jsx'
import MaterialDetailPage from './pages/MaterialDetailPage.jsx'

export default function App() {
  const COMING_SOON = false

  if (COMING_SOON) {
    return <ComingSoonPage />
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/prodavnica" element={<ShopPage />} />
        <Route path="/proizvod/:slug" element={<ProductPage />} />
        <Route path="/o-nama" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/korpa" element={<CartPage />} />
        <Route path="/porucivanje" element={<Checkout />} />
        <Route path="/uspesna-kupovina" element={<OrderSuccess />} />
        <Route path="/saradnja" element={<Collaborate />} />
        <Route path="/:slug" element={<StaticPage />} />
        <Route path="/materijali" element={<MaterialsPage />} />
        <Route path="/materijal/:slug" element={<MaterialDetailPage />} />
      </Routes>
    </MainLayout>
  )
}
