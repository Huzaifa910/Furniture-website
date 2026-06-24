import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiSearch, FiHeart, FiShoppingCart, FiPhone, FiMapPin } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { cartCount } = useCart()

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-espresso text-cream text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <FiPhone className="text-honey" /> +92 300 1234567
            </span>
            <span className="flex items-center gap-2">
              <FiMapPin className="text-honey" /> Manzoor Colony, Karachi
            </span>
          </div>
          <p className="text-honey-light">🪵 Premium Wooden Furniture – Crafted with Love</p>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-cream'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-3xl">🪑</span>
              <div>
                <h1 className="text-2xl font-bold text-walnut group-hover:text-oak transition-colors">
                  Huzaifa Craft
                </h1>
                <p className="text-xs text-oak -mt-1 tracking-wider">INTERIOR</p>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative text-sm font-medium tracking-wide uppercase transition-colors hover:text-oak ${
                      isActive ? 'text-oak' : 'text-walnut'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-oak rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-5">
              <button className="text-walnut hover:text-oak transition-colors hidden md:block">
                <FiSearch size={20} />
              </button>
              <Link to="/wishlist" className="text-walnut hover:text-oak transition-colors relative">
                <FiHeart size={20} />
                <span className="absolute -top-2 -right-2 bg-oak text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </Link>
              <Link to="/cart" className="text-walnut hover:text-oak transition-colors relative">
                <FiShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-oak text-cream text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              </Link>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-walnut hover:text-oak transition-colors"
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-80 border-t border-walnut/10' : 'max-h-0'
          }`}
        >
          <div className="bg-cream-dark px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `block py-3 px-4 rounded-lg text-sm font-medium uppercase tracking-wide transition-all ${
                    isActive
                      ? 'bg-walnut text-cream'
                      : 'text-walnut hover:bg-walnut/10'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-walnut/10">
              <button className="flex items-center gap-3 text-walnut hover:text-oak transition-colors py-3 px-4 w-full">
                <FiSearch size={18} /> Search Furniture
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar