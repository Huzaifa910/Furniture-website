import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMinus, FiPlus, FiTrash2, FiArrowLeft, FiShoppingBag, FiTruck } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, deliveryCharge, grandTotal, clearCart } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="bg-cream min-h-screen">
        <div className="bg-espresso py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-cream mb-3">Shopping Cart</h1>
            <p className="text-cream/70 text-lg">Review your selected items</p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-8xl block mb-6">🛒</span>
            <h2 className="text-3xl font-bold text-espresso mb-3">Your cart is empty</h2>
            <p className="text-espresso/50 mb-8 text-lg">Looks like you haven&apos;t added anything yet.</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 bg-walnut text-cream px-8 py-4 rounded-xl font-bold text-lg hover:bg-walnut-light transition-all shadow-lg"
            >
              <FiShoppingBag size={22} /> Browse Furniture
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="bg-espresso py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-cream mb-3">Shopping Cart</h1>
          <p className="text-cream/70 text-lg">{cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-5 shadow-md flex gap-5"
              >
                {/* Image */}
                <Link to={`/product/${item.id}`} className="shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-xl"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-espresso font-bold text-lg hover:text-oak transition-colors">{item.name}</h3>
                  </Link>
                  <p className="text-espresso/50 text-sm mt-1">{item.material}</p>
                  <p className="text-walnut font-bold text-xl mt-2">{formatPrice(item.price)}</p>
                </div>

                {/* Quantity & Remove */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-2"
                  >
                    <FiTrash2 size={20} />
                  </button>
                  <div className="flex items-center bg-walnut/5 rounded-xl">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-walnut/10 rounded-l-xl transition-colors"
                    >
                      <FiMinus size={16} />
                    </button>
                    <span className="px-4 font-bold text-espresso">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-walnut/10 rounded-r-xl transition-colors"
                    >
                      <FiPlus size={16} />
                    </button>
                  </div>
                  <p className="text-espresso font-bold text-lg">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Clear Cart & Continue Shopping */}
            <div className="flex justify-between pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-espresso/60 hover:text-oak font-semibold transition-colors"
              >
                <FiArrowLeft /> Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-red-400 hover:text-red-600 font-semibold transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-24">
              <h3 className="text-xl font-bold text-espresso mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-espresso/70">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(cartTotal)}</span>
                </div>
                
                <div className="flex justify-between text-espresso/70">
                  <span className="flex items-center gap-2">
                    <FiTruck className="text-oak" /> Delivery
                  </span>
                  {deliveryCharge === 0 ? (
                    <span className="text-green-600 font-semibold">FREE</span>
                  ) : (
                    <span className="font-semibold">{formatPrice(deliveryCharge)}</span>
                  )}
                </div>

                {deliveryCharge > 0 && (
                  <p className="text-xs text-espresso/40 bg-honey/5 p-3 rounded-lg">
                    Add {formatPrice(50000 - cartTotal)} more for free delivery!
                  </p>
                )}

                <div className="border-t border-walnut/10 pt-4">
                  <div className="flex justify-between text-lg font-bold text-espresso">
                    <span>Total</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-walnut text-cream text-center py-4 rounded-xl font-bold text-lg mt-6 block hover:bg-walnut-light transition-all shadow-lg"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart