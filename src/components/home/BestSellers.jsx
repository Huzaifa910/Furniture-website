import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiStar, FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi'
import products from '../../data/products'

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

const BestSellers = () => {
  // Get first 4 products as best sellers
  const bestSellers = products.slice(0, 4)

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
            Popular Picks
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-espresso mt-3 mb-4">
            Best Selling Furniture
          </h2>
          <p className="text-espresso/60 max-w-2xl mx-auto text-lg">
            Our most loved pieces, chosen by customers for their quality and design
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-72">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.isNew && (
                    <span className="bg-oak text-cream text-xs font-bold px-3 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                  {product.isSale && (
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      SALE
                    </span>
                  )}
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/20 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-walnut hover:bg-honey hover:text-cream transition-all shadow-lg transform hover:scale-110">
                    <FiShoppingCart size={20} />
                  </button>
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-walnut hover:bg-honey hover:text-cream transition-all shadow-lg transform hover:scale-110">
                    <FiHeart size={20} />
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-walnut hover:bg-honey hover:text-cream transition-all shadow-lg transform hover:scale-110"
                  >
                    <FiEye size={20} />
                  </Link>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="text-espresso font-semibold text-lg mb-2 hover:text-oak transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <FiStar className="text-honey fill-honey" size={16} />
                  <span className="text-espresso/70 text-sm font-medium">{product.rating}</span>
                  <span className="text-espresso/40 text-sm">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-walnut">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-espresso/40 line-through text-sm">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Material */}
                <p className="text-espresso/50 text-sm mt-2">{product.material}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-walnut hover:bg-walnut-light text-cream font-semibold px-10 py-4 rounded-lg transition-all hover:scale-105 shadow-lg"
          >
            View All Furniture →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default BestSellers