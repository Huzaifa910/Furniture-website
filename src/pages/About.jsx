import { motion } from 'framer-motion'
import { FiTruck, FiShield, FiUsers, FiAward, FiHeart } from 'react-icons/fi'

const team = [
  {
    name: 'Muhammad Usman',
    role: 'Founder & Master Craftsman',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    bio: '25+ years of woodworking experience. Passionate about creating heirloom-quality furniture.',
  },
  {
    name: 'Ahmed Raza',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
    bio: 'Blending modern aesthetics with traditional craftsmanship since 2012.',
  },
  {
    name: 'Sara Khan',
    role: 'Customer Relations Manager',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
    bio: 'Ensuring every customer gets personalized attention and the perfect furniture solution.',
  },
]

const About = () => {
  return (
    <div className="bg-cream">
      {/* Hero */}
      <div className="bg-espresso py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-honey font-semibold tracking-widest uppercase text-sm">Our Story</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cream mt-4 mb-6">About WoodCraft</h1>
            <p className="text-cream/70 text-lg leading-relaxed max-w-3xl mx-auto">
              We are more than just a furniture store — we are craftsmen, designers, and dreamers who believe every home deserves furniture that tells a story.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-oak font-semibold tracking-widest uppercase text-sm">Since 2010</span>
            <h2 className="text-3xl md:text-4xl font-bold text-espresso mt-3 mb-6">Crafting Excellence for Over a Decade</h2>
            <p className="text-espresso/70 leading-relaxed mb-4">
              WoodCraft was founded in 2010 in the heart of Karachi with a simple mission: to bring premium, handcrafted wooden furniture to Pakistani homes at fair prices.
            </p>
            <p className="text-espresso/70 leading-relaxed mb-4">
              What started as a small workshop with just 3 craftsmen has now grown into one of Karachi&apos;s most trusted furniture brands, serving over 10,000 happy customers nationwide.
            </p>
            <p className="text-espresso/70 leading-relaxed">
              Every piece we create is made from solid Sheesham and Walnut wood, hand-finished by skilled artisans who treat woodworking as an art form. No shortcuts, no particle board — just timeless furniture built to last generations.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600"
              alt="Our Workshop"
              className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-honey text-espresso rounded-2xl p-6 shadow-xl hidden md:block">
              <p className="text-4xl font-bold">15+</p>
              <p className="text-sm font-semibold">Years of Excellence</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-offwhite py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-oak font-semibold tracking-widest uppercase text-sm">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold text-espresso mt-3">What We Stand For</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FiAward size={28} />, title: 'Premium Quality', desc: '100% solid wood, no compromises' },
              { icon: <FiUsers size={28} />, title: 'Skilled Artisans', desc: 'Generations of woodworking mastery' },
              { icon: <FiHeart size={28} />, title: 'Made with Love', desc: 'Every piece crafted with passion' },
              { icon: <FiShield size={28} />, title: 'Trusted Warranty', desc: '5-year coverage on all products' },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-honey/10 rounded-xl flex items-center justify-center text-honey mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-espresso mb-2">{value.title}</h3>
                <p className="text-espresso/60 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-oak font-semibold tracking-widest uppercase text-sm">Our Team</span>
          <h2 className="text-3xl md:text-4xl font-bold text-espresso mt-3">Meet the Craftsmen</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            >
              <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-espresso">{member.name}</h3>
                <p className="text-oak text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-espresso/60 text-sm">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-walnut py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-cream mb-4">Ready to Transform Your Home?</h2>
          <p className="text-cream/70 mb-8">Visit our showroom or browse our collection online.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+923001234567" className="bg-honey text-espresso px-8 py-4 rounded-xl font-bold hover:bg-honey-light transition-all">
              <FiTruck className="inline mr-2" /> Call Us Now
            </a>
            <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-600 transition-all">
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About