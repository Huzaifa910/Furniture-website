import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiHome, FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

const OrderConfirmation = () => {
  const location = useLocation()
  const orderData = location.state

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <Link to="/" className="text-oak text-lg">← Go to Home</Link>
      </div>
    )
  }

  const { orderNumber, formData, grandTotal } = orderData

  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-10 shadow-xl text-center"
        >
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="text-green-500" size={50} />
          </div>

          <h1 className="text-3xl font-bold text-espresso mb-2">Order Placed Successfully!</h1>
          <p className="text-espresso/50 mb-8">Thank you for choosing WoodCraft Furniture</p>

          {/* Order Details */}
          <div className="bg-cream rounded-2xl p-6 text-left mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-espresso/60">Order Number</span>
              <span className="text-oak font-bold text-lg">#{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-espresso/60">Customer</span>
              <span className="text-espresso font-semibold">{formData.fullName}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-espresso/60">Phone</span>
              <span className="text-espresso font-semibold">{formData.phone}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-espresso/60">City</span>
              <span className="text-espresso font-semibold">{formData.city}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-espresso/60">Total Amount</span>
              <span className="text-walnut font-bold text-xl">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          {/* WhatsApp message already sent */}
          <p className="text-espresso/50 text-sm mb-6">
            Your order details have been sent to our team via WhatsApp. We will contact you shortly for confirmation.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="flex-1 bg-walnut text-cream py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-walnut-light transition-all"
            >
              <FiHome size={18} /> Back to Home
            </Link>
            <a
              href={`https://wa.me/923001234567`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition-all"
            >
              <FaWhatsapp size={18} /> Chat on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default OrderConfirmation