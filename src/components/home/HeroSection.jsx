import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const slides = [
  {
    title: "Craft Your Dream Home",
    subtitle: "With Premium Wooden Furniture",
    description: "Handcrafted pieces that bring warmth, elegance, and timeless beauty to every corner of your home.",
    buttonText: "Shop Collection",
    buttonLink: "/shop",
    bg: "bg-gradient-to-r from-espresso/90 to-espresso/40",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200"
  },
  {
    title: "Eid Special Sale",
    subtitle: "Up to 30% Off",
    description: "Transform your home this festive season with our exclusive handcrafted furniture collection.",
    buttonText: "View Offers",
    buttonLink: "/shop",
    bg: "bg-gradient-to-r from-walnut/90 to-walnut/30",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200"
  },
  {
    title: "New Arrivals 2026",
    subtitle: "Modern Designs, Classic Craft",
    description: "Discover our latest collection blending contemporary style with traditional woodworking.",
    buttonText: "Explore New",
    buttonLink: "/shop",
    bg: "bg-gradient-to-r from-espresso/90 to-espresso/30",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1200"
  },
]

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] min-h[600px]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className={`h-full w-full ${slide.bg} flex items-center`}>
                <div className="max-w-7xl mx-auto px-4 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="max-w-2xl"
                  >
                    <motion.p
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="text-honey text-lg md:text-xl font-medium mb-3 tracking-wider uppercase"
                    >
                      {slide.subtitle}
                    </motion.p>
                    
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.7 }}
                      className="text-4xl md:text-6xl lg:text-7xl font-bold text-cream mb-6 leading-tight"
                    >
                      {slide.title}
                    </motion.h1>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: 1 }}
                      className="text-cream/80 text-lg mb-8 max-w-xl leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="flex gap-4 flex-wrap"
                    >
                      <Link
                        to={slide.buttonLink}
                        className="bg-honey hover:bg-honey-light text-espresso font-semibold px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-lg hover:shadow-honey/30 inline-block"
                      >
                        {slide.buttonText} →
                      </Link>
                      <Link
                        to="/about"
                        className="border-2 border-cream/50 hover:border-cream text-cream font-semibold px-8 py-4 rounded-lg transition-all hover:bg-cream/10 inline-block"
                      >
                        About Us
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-8 h-12 border-2 border-cream/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cream/70 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection