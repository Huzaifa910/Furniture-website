import { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiFilter, FiX, FiStar, FiShoppingCart } from 'react-icons/fi'
import toast from 'react-hot-toast'
import products from '../data/products'
import { useCart } from '../context/CartContext'

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

const categories = [
  { value: 'all', label: 'All Furniture' },
  { value: 'living', label: 'Living Room' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'dining', label: 'Dining Room' },
  { value: 'office', label: 'Office' },
]

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A to Z' },
]

const Shop = () => {
  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all')
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState([0, 300000])
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const { addToCart } = useCart()

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }

    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    return result
  }, [selectedCategory, searchTerm, priceRange, sortBy])

  const handleAddToCart = (product) => {
    addToCart(product)
    toast.success(`${product.name} added to cart!`, { icon: '🛒' })
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Page Header */}
      <div className="bg-espresso py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-cream mb-3">Shop Furniture</h1>
            <p className="text-cream/70 text-lg">Discover handcrafted wooden furniture for every room</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Search & Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-espresso/40" size={20} />
            <input
              type="text"
              placeholder="Search furniture, material, room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-walnut/10 rounded-xl focus:outline-none focus:border-honey text-espresso placeholder:text-espresso/30 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-espresso/40 hover:text-espresso"
              >
                <FiX size={18} />
              </button>
            )}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-4 bg-white border border-walnut/10 rounded-xl focus:outline-none focus:border-honey text-espresso cursor-pointer min-w-[200px]"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-2 justify-center bg-walnut text-cream px-6 py-4 rounded-xl font-semibold"
          >
            <FiFilter size={18} />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
              <h3 className="text-lg font-bold text-espresso mb-5 flex items-center gap-2">
                <FiFilter className="text-oak" /> Filters
              </h3>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-espresso/60 uppercase tracking-wider mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all ${
                        selectedCategory === cat.value
                          ? 'bg-walnut text-cream font-semibold'
                          : 'text-espresso/70 hover:bg-walnut/5'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-espresso/60 uppercase tracking-wider mb-3">Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="300000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-oak"
                  />
                  <div className="flex justify-between text-sm text-espresso/60">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setPriceRange([0, 300000])
                  setSearchTerm('')
                  setSortBy('default')
                }}
                className="mt-6 w-full py-2.5 border-2 border-walnut/20 rounded-lg text-walnut font-semibold text-sm hover:bg-walnut hover:text-cream transition-all"
              >
                Reset All Filters
              </button>
            </div>
          </div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {mobileFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden w-full bg-white rounded-2xl p-6 shadow-md mb-6"
              >
                <h3 className="text-lg font-bold text-espresso mb-4">Filters</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {categories.map(cat => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        selectedCategory === cat.value
                          ? 'bg-walnut text-cream'
                          : 'bg-walnut/5 text-espresso/70'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
                <div>
                  <p className="text-sm text-espresso/60 mb-2">Max Price: {formatPrice(priceRange[1])}</p>
                  <input
                    type="range"
                    min="0"
                    max="300000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-oak"
                  />
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="mt-4 w-full bg-walnut text-cream py-2.5 rounded-lg font-semibold"
                >
                  Apply Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            <p className="text-espresso/50 text-sm mb-6">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-6xl">🔍</span>
                <h3 className="text-2xl font-bold text-espresso mt-4">No Products Found</h3>
                <p className="text-espresso/50 mt-2">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Image */}
                    <Link to={`/product/${product.id}`}>
                      <div className="relative overflow-hidden h-64">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          {product.isNew && (
                            <span className="bg-oak text-cream text-xs font-bold px-3 py-1 rounded-full">NEW</span>
                          )}
                          {product.isSale && (
                            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">SALE</span>
                          )}
                        </div>
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-espresso/60 flex items-center justify-center">
                            <span className="bg-white text-espresso font-bold px-6 py-2 rounded-full">Out of Stock</span>
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="p-5">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-espresso font-semibold text-lg mb-2 line-clamp-1 hover:text-oak transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-2">
                        <FiStar className="text-honey fill-honey" size={14} />
                        <span className="text-espresso/70 text-sm">{product.rating}</span>
                        <span className="text-espresso/40 text-sm">({product.reviews})</span>
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xl font-bold text-walnut">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-espresso/40 line-through text-sm">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                      <p className="text-espresso/50 text-xs mb-4">{product.material}</p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
                          product.inStock
                            ? 'bg-walnut text-cream hover:bg-walnut-light'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <FiShoppingCart size={16} />
                        {product.inStock ? 'Add to Cart' : 'Unavailable'}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop