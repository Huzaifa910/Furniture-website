import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { FiStar } from 'react-icons/fi'
import { FaQuoteLeft } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/pagination'

const testimonials = [
  {
    name: "Ahmed Khan",
    city: "Karachi",
    rating: 5,
    text: "I ordered a complete bedroom set and the quality is outstanding. The wood finish is beautiful and the craftsmanship is visible in every detail. Delivery was on time and the team helped with installation.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
  },
  {
    name: "Fatima Rizvi",
    city: "Lahore",
    rating: 5,
    text: "WoodCraft transformed my living room! The L-shaped sofa is incredibly comfortable and the fabric quality is premium. Their customer service is excellent. Highly recommended!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
  },
  {
    name: "Bilal Siddiqui",
    city: "Islamabad",
    rating: 5,
    text: "Got a custom dining table made for our family gatherings. The Sheesham wood and the carved details exceeded my expectations. Worth every rupee spent!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
  },
  {
    name: "Sana Tariq",
    city: "Karachi",
    rating: 4,
    text: "Beautiful office desk with ample storage. The walnut finish looks premium and the build quality is solid. Only wish delivery was a bit faster, but the product is worth the wait.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
  },
  {
    name: "Owais Ahmed",
    city: "Rawalpindi",
    rating: 5,
    text: "We furnished our entire new home with WoodCraft. Every piece from the beds to the TV unit is top-notch. The 5-year warranty gives complete peace of mind. Amazing work!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
  },
]

const Testimonials = () => {
  return (
    <section className="py-20 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-oak font-semibold tracking-widest uppercase text-sm">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-espresso mt-3 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-espresso/60 max-w-2xl mx-auto text-lg">
            Real feedback from real homeowners who trust WoodCraft
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 h-full">
                  {/* Quote Icon */}
                  <div className="text-honey/20 mb-4">
                    <FaQuoteLeft size={40} />
                  </div>
                  
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        size={18}
                        className={i < testimonial.rating ? 'text-honey fill-honey' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  
                  {/* Text */}
                  <p className="text-espresso/70 leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4 border-t border-walnut/5 pt-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-honey"
                    />
                    <div>
                      <h4 className="text-espresso font-semibold">{testimonial.name}</h4>
                      <p className="text-espresso/50 text-sm">{testimonial.city}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials