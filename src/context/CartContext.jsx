import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)
const CART_STORAGE_KEY = 'mohair_cart'

function getStoredCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    return savedCart ? JSON.parse(savedCart) : []
  } catch (error) {
    console.error('Greška pri čitanju korpe:', error)
    return []
  }
}

function saveCart(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

function getProductPrice(product) {
  return Number(product.sale_price || product.price || 0)
}

function getProductImage(product) {
  return (
    product.images?.find((image) => image.is_main)?.image_path ||
    product.images?.[0]?.image_path ||
    product.image ||
    ''
  )
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(getStoredCart)

  function updateCart(updater) {
    setItems((currentItems) => {
      const nextItems = updater(currentItems)
      saveCart(nextItems)
      return nextItems
    })
  }

  function addToCart(product, quantity = 1) {
    const selectedQuantity = Math.max(1, Number(quantity) || 1)

    updateCart((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + selectedQuantity }
            : item
        )
      }

      return [
        ...currentItems,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: getProductPrice(product),
          currency: product.currency || 'RSD',
          image: getProductImage(product),
          material: product.material,
          quantity: selectedQuantity,
        },
      ]
    })
  }

  function removeFromCart(id) {
    updateCart((currentItems) => currentItems.filter((item) => item.id !== id))
  }

  function updateQuantity(id, quantity) {
    const selectedQuantity = Math.max(1, Number(quantity) || 1)

    updateCart((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity: selectedQuantity } : item
      )
    )
  }

  function clearCart() {
    updateCart(() => [])
  }

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  )

  const delivery = subtotal > 0 && subtotal < 7000 ? 350 : 0
  const total = subtotal + delivery

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        delivery,
        total,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
