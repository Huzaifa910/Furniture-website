import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiCheck, FiTruck } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { useCart } from '../context/CartContext'

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

const cities = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad',
  'Multan', 'Peshawar', 'Quetta', 'Hyderabad', 'Gujranwala',
  'Other'
]

const Checkout = () => {
  const { cartItems, cartTotal, deliveryCharge, grandTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    notes: '',
  })
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()

    // Validation
    if (!formData.fullName || !formData.phone || !formData.city || !formData.address) {
      toast.error('Please fill all required fields')
      return
    }

    if (formData.phone.length < 11) {
      toast.error('Please enter a valid phone number')
      return
    }

    setIsSubmitting(true)

    // Build WhatsApp message
    const orderNumber = `WC-${Date.now().toString().slice(-6)}`
    let message = `🪵 *NEW ORDER - WoodCraft Furniture*\n\n`
    message += `📋 *Order #:* ${orderNumber}\n`
    message += `📅 *Date:* ${new Date().toLocaleDateString('en-PK')}\n\n`
    message += `👤 *Customer Details:*\n`
    message += `   Name: ${formData.fullName}\n`
    message += `   Phone: ${formData.phone}\n`
    if (formData.email) message += `   Email: ${formData.email}\n`
    message += `   City: ${formData.city}\n`
    message += `   Address: ${formData.address}\n`
    if (formData.notes) message += `   Notes: ${formData.notes}\n`
    message += `\n🛒 *Order Items:*\n`
    
    cartItems.forEach((item, index) => {
      message += `   ${index + 1}. ${item.name}\n`
      message += `      Qty: ${item.quantity} × ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}\n`
    })

    message += `\n💰 *Payment Summary:*\n`
    message += `   Subtotal: ${formatPrice(cartTotal)}\n`
    message += `   Delivery: ${deliveryCharge === 0 ? 'FREE' : formatPrice(deliveryCharge)}\n`
    message += `   *Total: ${formatPrice(grandTotal)}*\n`
    message += `\n💳 *Payment Method:* ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}\n`
    message += `\n✅ Please confirm this order.`

    // WhatsApp number (owner's number)
    const ownerPhone = '923122050547' // Replace with actual owner's WhatsApp number
    const whatsappURL = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(message)}`

    // Simulate order processing
    setTimeout(() => {
      setIsSubmitting(false)
      clearCart()
      
      // Show success toast
      toast.success('Order placed successfully! Redirecting to WhatsApp...', {
        duration: 3000,
      })

      // Open WhatsApp after short delay
      setTimeout(() => {
        window.open(whatsappURL, '_blank')
        navigate('/order-confirmation', { 
          state: { 
            orderNumber,
            formData,
            paymentMethod,
            grandTotal 
          } 
        })
      }, 1500)
    }, 1000)
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-cream min-h-screen">
        <div className="bg-espresso py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-cream mb-3">Checkout</h1>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <span className="text-8xl block mb-6">🛒</span>
          <h2 className="text-3xl font-bold text-espresso mb-3">Your cart is empty</h2>
          <p className="text-espresso/50 mb-8">Add some items before checking out.</p>
          <Link to="/shop" className="bg-walnut text-cream px-8 py-4 rounded-xl font-bold text-lg hover:bg-walnut-light transition-all">
            Browse Furniture
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="bg-espresso py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-cream mb-3">Checkout</h1>
          <p className="text-cream/70 text-lg">Complete your order</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <Link to="/cart" className="inline-flex items-center gap-2 text-espresso/60 hover:text-oak font-semibold mb-8 transition-colors">
          <FiArrowLeft /> Back to Cart
        </Link>

        <form onSubmit={handlePlaceOrder}>
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left - Shipping Form */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-8 shadow-md"
              >
                <h2 className="text-2xl font-bold text-espresso mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-espresso/70 text-sm font-semibold mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Ahmed Khan"
                      className="w-full px-4 py-3 bg-cream border border-walnut/10 rounded-xl focus:outline-none focus:border-honey transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-espresso/70 text-sm font-semibold mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="03001234567"
                      className="w-full px-4 py-3 bg-cream border border-walnut/10 rounded-xl focus:outline-none focus:border-honey transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-espresso/70 text-sm font-semibold mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ahmed@example.com"
                      className="w-full px-4 py-3 bg-cream border border-walnut/10 rounded-xl focus:outline-none focus:border-honey transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-espresso/70 text-sm font-semibold mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cream border border-walnut/10 rounded-xl focus:outline-none focus:border-honey transition-all cursor-pointer"
                      required
                    >
                      <option value="">Select City</option>
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block text-espresso/70 text-sm font-semibold mb-2">
                    Full Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House No, Street, Area, Landmark..."
                    rows="3"
                    className="w-full px-4 py-3 bg-cream border border-walnut/10 rounded-xl focus:outline-none focus:border-honey transition-all resize-none"
                    required
                  />
                </div>

                <div className="mt-5">
                  <label className="block text-espresso/70 text-sm font-semibold mb-2">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any special instructions..."
                    rows="2"
                    className="w-full px-4 py-3 bg-cream border border-walnut/10 rounded-xl focus:outline-none focus:border-honey transition-all resize-none"
                  />
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-md mt-6"
              >
                <h2 className="text-2xl font-bold text-espresso mb-6">Payment Method</h2>
                <div className="space-y-3">
                  <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'cod' ? 'border-oak bg-honey/5' : 'border-walnut/10 hover:border-walnut/30'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-oak w-5 h-5"
                    />
                    <div>
                      <p className="font-bold text-espresso">Cash on Delivery</p>
                      <p className="text-espresso/50 text-sm">Pay when you receive your furniture</p>
                    </div>
                  </label>
                  <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'bank' ? 'border-oak bg-honey/5' : 'border-walnut/10 hover:border-walnut/30'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-oak w-5 h-5"
                    />
                    <div>
                      <p className="font-bold text-espresso">Bank Transfer</p>
                      <p className="text-espresso/50 text-sm">Account details will be shared on WhatsApp</p>
                    </div>
                  </label>
                </div>
              </motion.div>
            </div>

            {/* Right - Order Summary */}
            <div className="lg:w-96">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-md sticky top-24"
              >
                <h3 className="text-xl font-bold text-espresso mb-6">Your Order</h3>
                
                {/* Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="text-espresso font-semibold text-sm line-clamp-1">{item.name}</p>
                        <p className="text-espresso/50 text-xs">Qty: {item.quantity}</p>
                        <p className="text-walnut font-bold text-sm">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-walnut/10 pt-4 space-y-3">
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
                  <div className="flex justify-between text-lg font-bold text-espresso border-t border-walnut/10 pt-3">
                    <span>Total</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg mt-6 flex items-center justify-center gap-3 hover:bg-green-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span> Processing...
                    </>
                  ) : (
                    <>
                      <FaWhatsapp size={22} /> Place Order via WhatsApp
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 mt-4 text-espresso/40 text-xs justify-center">
                  <FiCheck className="text-green-500" /> Secure & hassle-free ordering
                </div>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout