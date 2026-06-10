import '../styles/collaborate.css'
import { Link } from 'react-router-dom'
import { SITE } from '../confg/config.js'
import {
	ShoppingBag,
	UsersRound,
	Camera,
	Megaphone,
	Heart,
	Leaf,
	HandHeart,
	HeartHandshake,
	Lightbulb,
	FilePenLine,
	MessagesSquare,
	Handshake,
	Mail
} from 'lucide-react'
import { SiTeal } from 'react-icons/si'

export default function Collaborate() {
	return (
		<main className="collab-page">
			<section className="collab-hero">
				<div className="collab-hero-content">
					<h1>
						Postani deo <br />
						<span>Mohair Studio priče</span>
					</h1>

					<div className="collab-divider">♥</div>

					<h2>Stvaramo zajedno</h2>

					<p>
						Mohair Studio nije samo mesto na kome prodajemo ručno izrađene proizvode.
						To je zajednica ljudi koji veruju da ručni rad nosi posebnu vrednost,
						priču i emociju.
					</p>

					<p>
						Ako i ti stvaraš jedinstvene rukotvorine sa pažnjom, ljubavlju i
						posvećenošću detaljima, možda si upravo osoba koju tražimo.
					</p>

					<p>
						Želimo da okupimo male kreativne radionice, samostalne autore i
						zaljubljenike u ručni rad koji dele našu viziju kvaliteta, održivosti i
						autentičnosti.
					</p>
				</div>
			</section>
			<section className="collab-offer">
				<h3>Šta nudimo našim saradnicima?</h3>

				<div className="collab-offer-list">
					<div className="offer-item">
						<ShoppingBag size={36} strokeWidth={1.4} />
						<p>Mogućnost prodaje proizvoda kroz Mohair Studio</p>
					</div>

					<div className="offer-item">
						<UsersRound size={36} strokeWidth={1.4} />
						<p>Predstavljanje tvog rada široj zajednici ljubitelja rukotvorina</p>
					</div>

					<div className="offer-item">
						<Camera size={36} strokeWidth={1.4} />
						<p>Profesionalnu prezentaciju proizvoda na našem sajtu</p>
					</div>

					<div className="offer-item">
						<Megaphone size={36} strokeWidth={1.4} />
						<p>Promociju kroz društvene mreže i marketing aktivnosti</p>
					</div>

					<div className="offer-item">
						<Heart size={36} strokeWidth={1.4} />
						<p>Mesto u pažljivo odabranoj kolekciji ručno izrađenih proizvoda</p>
					</div>
				</div>
			</section>
			<section className="collab-info">
				<div className="collab-card collab-who">
					<h3>Koga tražimo?</h3>
					<div className="small-divider">♥</div>

					<p>
						Saradnike koji izrađuju proizvode ručno i sa posebnom pažnjom prema
						kvalitetu.
					</p>

					<p>Dobrodošli su kreatori koji se bave:</p>

					<ul>
						<li>pletenjem</li>
						<li>heklanjem</li>
						<li>šivenjem</li>
						<li>drugim vrstama autentičnih rukotvorina</li>
					</ul>

					<p className="collab-note">
						Najvažnije nam nije šta pravite, već kako to radite.
					</p>
				</div>

				<div className="collab-card collab-standards">
					<h3>Naši standardi</h3>
					<div className="small-divider">♥</div>

					<p className="standards-intro">
						Kako bismo sačuvali kvalitet i prepoznatljivost Mohair Studio brenda,
						svi proizvodi koji se prodaju kroz našu platformu moraju ispunjavati
						određene kriterijume.
					</p>

					<div className="standards-grid">
						<div className="standard-item">
							<Leaf size={36} strokeWidth={1.4} />
							<h4>Kvalitet iznad svega</h4>
							<p>Koristimo i prihvatamo kvalitetne materijale koji su prijatni za korišćenje, dugotrajni i bezbedni.</p>
						</div>

						<div className="standard-item">
							<HandHeart size={36} strokeWidth={1.4} />
							<h4>Ručna izrada</h4>
							<p>Proizvodi moraju biti ručno izrađeni ili ručno završeni od strane autora.</p>
						</div>

						<div className="standard-item">
							<HeartHandshake size={36} strokeWidth={1.4} />
							<h4>Pažnja prema detaljima</h4>
							<p>Očekujemo urednu izradu, kvalitetne završne obrade i proizvode spremne za upotrebu.</p>
						</div>

						<div className="standard-item">
							<Lightbulb size={36} strokeWidth={1.4} />
							<h4>Originalnost</h4>
							<p>Podstičemo autorske ideje, kreativnost i jedinstven dizajn.</p>
						</div>

						<div className="standard-item">
							<Heart size={36} strokeWidth={1.4} />
							<h4>Poštovanje vrednosti brenda</h4>
							<p>Negujemo toplinu, eleganciju, prirodne materijale i bezvremensku estetiku.</p>
						</div>
					</div>
				</div>
			</section>
			<section className="collab-process">
				<h3>Kako izgleda proces saradnje?</h3>
				<div className="small-divider">♥</div>

				<div className="process-grid">
					<div className="process-step">
						<span className="step-number">1</span>
						<FilePenLine size={36} strokeWidth={1.4} />
						<h4>Prijava</h4>
						<p>Pošalji nam nekoliko fotografija svojih radova, kratku priču o sebi i informacije o materijalima koje koristiš.</p>
					</div>

					<div className="process-step">
						<span className="step-number">2</span>
						<MessagesSquare size={36} strokeWidth={1.4} />
						<h4>Upoznavanje</h4>
						<p>Pregledaćemo tvoje proizvode i razgovarati o mogućnostima saradnje.</p>
					</div>

					<div className="process-step">
						<span className="step-number">3</span>
						<Handshake size={36} strokeWidth={1.4} />
						<h4>Dogovor</h4>
						<p>Definišemo uslove saradnje, način predstavljanja proizvoda i zajedničke standarde.</p>
					</div>

					<div className="process-step">
						<span className="step-number">4</span>
						<ShoppingBag size={36} strokeWidth={1.4} />
						<h4>Dobrodošlica u Mohair Studio</h4>
						<p>Nakon odobrenja, tvoji proizvodi postaju deo naše kolekcije.</p>
					</div>
				</div>
			</section>
			<section className="collab-cta">
				<div className="cta-heart">
					<Heart size={82} strokeWidth={1.2} />
				</div>

				<div className="cta-text">
					<h3>Verujemo u male stvaraoce</h3>

					<p>
						Znamo koliko vremena, truda i ljubavi stoji iza svakog ručno izrađenog
						proizvoda. Zato želimo da pružimo prostor ljudima koji stvaraju srcem i
						koji veruju da kvalitet uvek pronalazi svoj put do pravih kupaca.
					</p>

					<p className="cta-note">
						Ako prepoznaješ sebe u ovoj priči, radovaćemo se da te upoznamo.
					</p>
				</div>

				<div className="cta-contact">
					<div className="cta-contact-content">
						<h4>Pošalji nam svoju prijavu</h4>

						<a href={`mailto:${SITE.email}`} className="cta-email">
							{SITE.email}
						</a>

						<p>
							Ili nas kontaktiraj putem kontakt forme na sajtu.
						</p>
						<Link
							to="/kontakt"
							className="cta-button"
						>
							Kontakt forma
						</Link>
					</div>
				</div>
			</section>
		</main>
	)
}