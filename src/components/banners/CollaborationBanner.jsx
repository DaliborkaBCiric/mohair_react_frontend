import { Link } from 'react-router-dom'
import '../../styles/collaboration-banner.css'

export default function CollaborationBanner({
	title = 'Stvaraš rukotvorine?',
	description = 'Pridruži se Mohair Studio zajednici i predstavi svoje proizvode našim kupcima.',
	buttonText = 'Saznaj više',
	compact = false,
}) {
	return (
		<section
			className={`sidebar-collab-banner ${compact ? 'sidebar-collab-banner--compact' : ''
				}`}
		>
			<span className="collab-banner-eyebrow">Saradnja</span>

			<h3>{title}</h3>

			<p>{description}</p>

			<Link to="/saradnja" className="collab-banner-link">
				{buttonText}
			</Link>
		</section>
	)
}