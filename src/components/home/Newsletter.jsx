import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend } from 'react-icons/fi'
import toast from 'react-hot-toast'

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      toast.success('Thank you for subscribing! 🎉')
      setEmail('')
    } else {
      toast.error('Please enter your email')
    }
  }

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200)`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/95 to-espresso/80" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-honey font-semibold tracking-widest uppercase text-sm">
            Stay Connected
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cream mt-3 mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-cream/70 text-lg mb-10 max-w-2xl mx-auto">
            Subscribe to get exclusive deals, new arrivals updates, and interior design tips delivered to your inbox.
          </p>
          
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-white/10 border border-cream/20 rounded-xl px-6 py-4 text-cream placeholder:text-cream/40 focus:outline-none focus:border-honey focus:bg-white/20 transition-all text-lg"
              required
            />
            <button
              type="submit"
              className="bg-honey hover:bg-honey-light text-espresso font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-lg"
            >
              Subscribe <FiSend size={20} />
            </button>
          </form>
          
          {/* Privacy Note */}
          <p className="text-cream/40 text-sm mt-5">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter