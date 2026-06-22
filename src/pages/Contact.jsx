import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPhone, FiMapPin, FiMail, FiClock, FiSend } from 'react-icons/fi'
import { FaWhatsapp, FaFacebookF, FaInstagram } from 'react-icons/fa'
import toast from 'react-hot-toast'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Send to WhatsApp
    const message = `👋 *New Inquiry from WoodCraft Website*\n\n👤 Name: ${form.name}\n📧 Email: ${form.email}\n📞 Phone: ${form.phone}\n💬 Message: ${form.message}`
    window.open(`https://wa.me/923001234567?text=${encodeURIComponent(message)}`, '_blank')
    
    toast.success('Message sent via WhatsApp!')
    setForm({ name: '', email: '', phone: '', message: '' })
  }

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
            <span className="text-honey font-semibold tracking-widest uppercase text-sm">Get in Touch</span>
            <h1 className="text-4xl md:text-5xl font-bold text-cream mt-4 mb-4">Contact Us</h1>
            <p className="text-cream/70 text-lg">We&apos;d love to hear from you. Visit our showroom or reach out online.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-espresso mb-8">Reach Out to Us</h2>
            
            <div className="space-y-6">
              {[
                { icon: <FiMapPin size={22} />, title: 'Showroom Address', info: 'Main Showroom, Manzoor Colony, Karachi, Pakistan' },
                { icon: <FiPhone size={22} />, title: 'Phone', info: '+92 300 1234567' },
                { icon: <FaWhatsapp size={22} />, title: 'WhatsApp', info: '+92 300 1234567' },
                { icon: <FiMail size={22} />, title: 'Email', info: 'info@woodcraft.pk' },
                { icon: <FiClock size={22} />, title: 'Working Hours', info: 'Monday - Saturday: 10 AM - 9 PM' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-honey/10 rounded-xl flex items-center justify-center text-honey shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-espresso/50 text-sm">{item.title}</p>
                    <p className="text-espresso font-semibold">{item.info}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <p className="text-espresso/50 text-sm mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[FaFacebookF, FaInstagram, FaWhatsapp].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-walnut text-cream rounded-xl flex items-center justify-center hover:bg-honey hover:text-espresso transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-espresso mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-espresso/70 text-sm font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ahmed Khan"
                    className="w-full px-4 py-3 bg-cream border border-walnut/10 rounded-xl focus:outline-none focus:border-honey transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-espresso/70 text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ahmed@example.com"
                    className="w-full px-4 py-3 bg-cream border border-walnut/10 rounded-xl focus:outline-none focus:border-honey transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-espresso/70 text-sm font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="03001234567"
                    className="w-full px-4 py-3 bg-cream border border-walnut/10 rounded-xl focus:outline-none focus:border-honey transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-espresso/70 text-sm font-semibold mb-2">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your furniture needs..."
                    rows="4"
                    className="w-full px-4 py-3 bg-cream border border-walnut/10 rounded-xl focus:outline-none focus:border-honey transition-all resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-walnut text-cream py-4 rounded-xl font-bold text-lg hover:bg-walnut-light transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <FiSend /> Send via WhatsApp
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-16 bg-white rounded-2xl overflow-hidden shadow-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <FiMapPin size={40} className="text-oak mx-auto mb-3" />
            <p className="text-espresso font-bold text-lg">Visit Our Showroom</p>
            <p className="text-espresso/50">Manzoor Colony, Karachi</p>
            <a
              href="https://maps.google.com/?q=Manzoor+Colony+Karachi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-oak font-semibold text-sm hover:underline mt-2 inline-block"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact