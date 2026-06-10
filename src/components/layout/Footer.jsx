import { Link } from 'react-router-dom'
import { SITE } from '../../confg/config'
import { Mail, Truck, BadgeCheck, RotateCcw, Headset } from 'lucide-react'

import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP
} from 'react-icons/fa'

import logo from '../../assets/logo-main.png'

export default function Footer() {
  return (
    <footer className="footer">
      <section className="service-strip">
        <div className="container service-strip-inner">
          <div className="service-item">
            <Truck size={40} strokeWidth={0.9} />
            <div>
              <b>BESPLATNA DOSTAVA</b>
              <span>Za porudžbine preko 60€</span>
            </div>
          </div>

          <div className="service-item">
            <BadgeCheck size={40} strokeWidth={0.9} />
            <div>
              <b>SIGURNA KUPOVINA</b>
              <span>100% zaštita podataka</span>
            </div>
          </div>

          <div className="service-item">
            <RotateCcw size={40} strokeWidth={0.9} />
            <div>
              <b>LAKO VRAĆANJE</b>
              <span>14 dana mogućnost povrata</span>
            </div>
          </div>

          <div className="service-item">
            <Headset size={40} strokeWidth={0.9} />
            <div>
              <b>PODRŠKA</b>
              <span>Tu smo za vas</span>
            </div>
          </div>
        </div>
      </section>
      <div className="footer-inner">
        <div className="footer-logo">
          <img src={logo} alt="Mohair Studio" />
        </div>

        <div className="footer-about">
          <p>
            Kreiramo unikatne, ručno rađene proizvode od prirodnih materijala
            sa ljubavlju prema detaljima i vama.
          </p>

          <div className="footer-social">
            <a href={SITE.socials.instagram}><FaInstagram /></a>
            <a href={SITE.socials.facebook}><FaFacebookF /></a>
            <a href={SITE.socials.pinterest}><FaPinterestP /></a>
            <a href={`mailto:${SITE.email}`}><Mail /></a>
          </div>
        </div>

        <div className="footer-column">
          <h4>PROIZVODI</h4>
          <Link to="/prodavnica">Svi proizvodi</Link>
          <Link to="/prodavnica?category=setovi-za-bebe">Setovi za bebe</Link>
          <Link to="/prodavnica?category=amigurumi-igracke">Amigurumi igračke</Link>
          <Link to="/prodavnica?category=vunene-carape">Vunene čarape</Link>
          <Link to="/prodavnica?category=dekice-i-prekrivaci">Dekice i prekrivači</Link>
        </div>

        <div className="footer-column">
          <h4>INFORMACIJE</h4>
          <Link to="/o-nama">O nama</Link>
          <Link to="/dostava-i-placanje">Dostava i plaćanje</Link>
          <Link to="/povrat-i-zamena">Povrat i zamena</Link>
          <Link to="/faq">Česta pitanja</Link>
          <Link to="/kontakt">Kontakt</Link>
        </div>

        <div className="footer-column">
          <h4>KORISNI LINKOVI</h4>
          <Link to="/saradnja">Saradnja</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/uslovi-koriscenja">Uslovi korišćenja</Link>
          <Link to="/politika-privatnosti">Politika privatnosti</Link>
        </div>

        <div className="footer-column">
          <h4>KONTAKT</h4>
          <span>{SITE.email}</span>
          <span>{SITE.phoneDisplay}</span>
          <span>{SITE.address}</span>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 Mohair Studio. Sva prava zadržana.
      </div>

    </footer>
  )
}
