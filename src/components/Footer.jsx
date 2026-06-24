import { Link } from 'react-router-dom'
import { FiPhone, FiMapPin, FiMail, FiClock, FiSend } from 'react-icons/fi'
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-espresso text-cream">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🪑</span>
              <div>
                <h3 className="text-xl font-bold text-cream">Huzaifa Craft</h3>
                <p className="text-xs text-honey -mt-1 tracking-wider">INTERIOR</p>
              </div>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed mb-6">
              Crafting premium wooden furniture since 2010. We bring warmth and elegance to your home with handcrafted pieces made from the finest wood.
            </p>
            <div className="flex gap-3">
              {[FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream hover:bg-honey hover:border-honey hover:text-espresso transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-honey"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Shop All', path: '/shop' },
                { name: 'Living Room', path: '/shop?category=living' },
                { name: 'Bedroom', path: '/shop?category=bedroom' },
                { name: 'Dining Room', path: '/shop?category=dining' },
                { name: 'Office', path: '/shop?category=office' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-cream/70 hover:text-honey transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="text-honey">▸</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-honey"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-cream/70 text-sm">
                <FiMapPin className="text-honey mt-1 shrink-0" size={16} />
                <span>Main Showroom, Gulshan-e-Iqbal Block 7, Karachi, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 text-cream/70 text-sm">
                <FiPhone className="text-honey shrink-0" size={16} />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-3 text-cream/70 text-sm">
                <FiMail className="text-honey shrink-0" size={16} />
                <span>info@woodcraft.pk</span>
              </li>
              <li className="flex items-center gap-3 text-cream/70 text-sm">
                <FiClock className="text-honey shrink-0" size={16} />
                <span>Mon - Sat: 10 AM - 9 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-honey"></span>
            </h4>
            <p className="text-cream/70 text-sm mb-4">
              Subscribe for exclusive deals, new arrivals, and design inspiration.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-cream/10 border border-cream/20 rounded-l-lg px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-honey w-full"
              />
              <button className="bg-honey hover:bg-honey-light text-espresso px-4 rounded-r-lg transition-colors flex items-center justify-center">
                <FiSend size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-cream/50 text-sm">
            © {new Date().getFullYear()} Huzaifa Craft. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-cream/50">
            <a href="#" className="hover:text-honey transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-honey transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-honey transition-colors">Returns Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer