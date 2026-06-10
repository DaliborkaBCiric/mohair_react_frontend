import "../styles/about.css";
import hands from "../assets/hands.png";
import GiftIcon from "../assets/icon_gift.png";
import Leaf from "../assets/svg_icons/leaf.svg";
import aboutImage from "../../images/about-handmade.png";
import logo from '../assets/logo-main.png'
import shieldIcon from "../assets/svg_icons/shield-check.svg"
import idea from "../assets/svg_icons/idea.svg"
import CollaborationBanner from "../components/banners/CollaborationBanner";

export default function About() {
  return (
    <section className="about-section">
      <div className="about-inner">
        <div className="about-text">
          <div className="small-title">
            <span></span>
            <strong>O NAMA</strong>
            <span></span>
          </div>

          <h1>Ručni rad sa ljubavlju</h1>

          <div className="heart-line">
            <span></span>
            <i>♡</i>
            <span></span>
          </div>

          <p>
            Mohair Studio nastao je iz ljubavi prema heklanju, mekim
            materijalima i stvaranju proizvoda koji donose toplinu u svaki dom.
          </p>

          <p>
            Svaki komad izrađujemo pažljivo, od najkvalitetnijih materijala, sa
            posebnom pažnjom na detalje i sigurnost — posebno kada su u pitanju
            najmlađi članovi porodice.
          </p>

          <p>
            Naš cilj je da kroz unikatne, ručno rađene proizvode unesemo
            nežnost, radost i udobnost u vaš svakodnevni život.
          </p>

          <a href="/prodavnica" className="about-btn">
            <button className="btn" fdprocessedid="b0tf9">SAZNAJ VIŠE</button>
          </a>
        </div>

        <div className="about-photo">
          <img src={aboutImage} alt="Ručni rad sa ljubavlju" />
        </div>
      </div>

      <div className="features">
        <div className="feature">
          <div className="feature-icon">
            <img src={hands} alt="rucni rad" />
          </div>
          <div>
            <h3>RUČNI RAD</h3>
            <p>Sa ljubavlju</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon"><img src={Leaf} alt="prirodni materijali" /></div>
          <div>
            <h3>PRIRODNI MATERIJALI</h3>
            <p>Pamuk & vuna</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon"><img src={shieldIcon} alt="bezbedno" /></div>
          <div>
            <h3>SIGURNO ZA NAJMLAĐE</h3>
            <p>Bezbedni materijali</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-icon"><img src={idea} alt="izrada po zelji" /></div>
          <div>
            <h3>IZRADA PO ŽELJI</h3>
            <p>Vaša ideja, naša izrada</p>
          </div>
        </div>
      </div>

      <CollaborationBanner />
    </section>
  );
}