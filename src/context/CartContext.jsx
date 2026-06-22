import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on first render
    const savedCart = localStorage.getItem('woodcraft_cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('woodcraft_cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])
  }

  // Calculate totals
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  const deliveryCharge = cartTotal >= 50000 ? 0 : 2000
  const grandTotal = cartTotal + deliveryCharge

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    deliveryCharge,
    grandTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}