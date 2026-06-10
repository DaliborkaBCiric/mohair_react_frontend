import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ScrollToTop from './ScrollToTop.jsx'

export default function MainLayout({ children }) {
  return <><ScrollToTop /><Header /><main>{children}</main><Footer /></>
}
