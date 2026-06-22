import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

const categories = [
  {
    name: 'Living Room',
    description: 'Sofas, Coffee Tables & TV Units',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600',
    link: '/shop?category=living',
    icon: '🛋️',
  },
  {
    name: 'Bedroom',
    description: 'Beds, Wardrobes & Dressers',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600',
    link: '/shop?category=bedroom',
    icon: '🛏️',
  },
  {
    name: 'Dining Room',
    description: 'Dining Sets & Cabinets',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600',
    link: '/shop?category=dining',
    icon: '🍽️',
  },
  {
    name: 'Office',
    description: 'Desks, Chairs & Bookshelves',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600',
    link: '/shop?category=office',
    icon: '💼',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const Categories = () => {
  return (
    <section className="py-20 bg-cream">
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
            Browse By Room
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-espresso mt-3 mb-4">
            Find Furniture for Every Space
          </h2>
          <p className="text-espresso/60 max-w-2xl mx-auto text-lg">
            Explore our curated collections designed to transform every room in your home
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-80"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/30 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-4xl mb-3 block">{category.icon}</span>
                <h3 className="text-cream text-xl font-bold mb-1">{category.name}</h3>
                <p className="text-cream/70 text-sm mb-4">{category.description}</p>
                <Link
                  to={category.link}
                  className="inline-flex items-center gap-2 text-honey hover:text-honey-light font-semibold text-sm transition-colors group/link"
                >
                  Explore Now
                  <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Categories