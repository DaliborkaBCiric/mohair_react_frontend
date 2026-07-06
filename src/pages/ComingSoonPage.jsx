import '../styles/coming-soon.css'

export default function ComingSoonPage() {
	return (
		<main
			className="coming-soon-page"
			style={{ backgroundImage: `url(/images/comming-soon.png)` }}
		>
			<section className="coming-soon-card">
				<p className="coming-label">COMING SOON</p>

				<h1>Mohair Studio</h1>

				<p className="script-text">
					Ručno izrađeni komadi koji donose toplinu, nežnost i radost svakodnevici.
				</p>

				<div className="divider">
					<span></span>
					<strong>♥</strong>
					<span></span>
				</div>

				<p className="main-text">
					Pažljivo izrađujemo naš online butik
					<br />
					posvećen toplim teksturama, nežnim bojama
					<br />
					i ručno rađenim detaljima.
				</p>

				<div className="thin-divider"></div>
			</section>
		</main>
	)
}