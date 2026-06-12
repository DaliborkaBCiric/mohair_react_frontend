import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/navigation'

export default function ProductCarousel({ products }) {
	return (
		<div className="product-carousel-wrap">
			<button className="carousel-arrow carousel-arrow-prev">
				<ChevronLeft />
			</button>

			<Swiper
				modules={[Navigation]}
				navigation={{
					prevEl: '.carousel-arrow-prev',
					nextEl: '.carousel-arrow-next',
				}}
				spaceBetween={22}
				slidesPerView={5}
				breakpoints={{
					0: { slidesPerView: 1.2, spaceBetween: 16 },
					560: { slidesPerView: 2, spaceBetween: 18 },
					768: { slidesPerView: 3, spaceBetween: 20 },
					1100: { slidesPerView: 5, spaceBetween: 22 },
				}}
			>
				{products.map((product) => (
					<SwiperSlide key={product.id}>
						<Link to={`/proizvod/${product.slug}`}>
							<article className="carousel-product-card">
								{product.badge && (
									<span className="product-badge">{product.badge}</span>
								)}
								{product.images
									.filter(image => image.is_main == 1)
									.map(image => (
										<img
											key={image.id}
											src={image.image_path}
											alt={image.alt_text || product.name}
										/>
									))}

								<div className="carousel-product-info">
									<h3>{product.name}</h3>
									<p>{product.material.name}</p>

									<div className="product-bottom">
										<span>{product.price} {product.currency}</span>
										<button>
											<ShoppingBag size={16} />
										</button>
									</div>
								</div>
							</article>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>

			<button className="carousel-arrow carousel-arrow-next">
				<ChevronRight />
			</button>
		</div>
	)
}