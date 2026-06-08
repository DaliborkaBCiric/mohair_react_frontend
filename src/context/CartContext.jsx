import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addToCart = (product) => {
    setItems((current) => {
      const found = current.find((item) => item.id === product.id)
      if (found) {
        return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...current, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => setItems((current) => current.filter((item) => item.id !== id))
  const clearCart = () => setItems([])

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items])
  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])

  return <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total, count }}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
