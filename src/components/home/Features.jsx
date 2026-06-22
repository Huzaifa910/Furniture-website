import { motion } from 'framer-motion'
import { FiTruck, FiShield, FiTool, FiClock, FiUsers, FiAward } from 'react-icons/fi'

const features = [
  {
    icon: <FiTruck size={28} />,
    title: 'Free Delivery',
    description: 'Free delivery across Karachi on orders above PKR 50,000. Safe & secure shipping.',
  },
  {
    icon: <FiShield size={28} />,
    title: '5 Year Warranty',
    description: 'All our furniture comes with a 5-year manufacturing warranty for peace of mind.',
  },
  {
    icon: <FiTool size={28} />,
    title: 'Custom Designs',
    description: 'Get furniture made to your exact specifications. Custom size, color, and finish.',
  },
  {
    icon: <FiClock size={28} />,
    title: 'Timely Delivery',
    description: 'We deliver within 7-14 working days. Urgent orders available on request.',
  },
  {
    icon: <FiUsers size={28} />,
    title: 'Expert Craftsmen',
    description: '20+ years of experience. Our artisans use traditional techniques with modern tools.',
  },
  {
    icon: <FiAward size={28} />,
    title: 'Premium Quality',
    description: 'We use only solid Sheesham and Walnut wood. No particle board or MDF.',
  },
]

const Features = () => {
  return (
    <section className="py-20 bg-offwhite relative overflow-hidden">
      {/* Wood Texture Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, #5C3A21 0px, #5C3A21 1px, transparent 1px, transparent 60px)`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-oak font-semibold tracking-widest uppercase text-sm">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-espresso mt-3 mb-4">
            Crafting Excellence Since 2010
          </h2>
          <p className="text-espresso/60 max-w-2xl mx-auto text-lg">
            We don&apos;t just make furniture. We create heirlooms that last for generations.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-walnut/5 group"
            >
              <div className="w-16 h-16 bg-honey/10 rounded-xl flex items-center justify-center text-honey mb-6 group-hover:bg-honey group-hover:text-cream transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-espresso mb-3">{feature.title}</h3>
              <p className="text-espresso/60 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Counter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-walnut/10"
        >
          {[
            { number: '20+', label: 'Years Experience' },
            { number: '10,000+', label: 'Happy Customers' },
            { number: '500+', label: 'Furniture Designs' },
            { number: '100%', label: 'Solid Wood' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-walnut">{stat.number}</p>
              <p className="text-espresso/50 text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Features