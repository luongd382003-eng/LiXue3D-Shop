import { useMemo, useState } from 'react'
import CartContext from './CartContext.js'
import shopProducts from '../data/shopProducts.js'

function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [returnToPath, setReturnToPath] = useState('/shop')

  function addToCart(productId, sourcePath) {
    const product = shopProducts.find((item) => item.id === productId)

    if (!product) {
      throw new Error(`Không tìm thấy sản phẩm có mã "${productId}".`)
    }

    if (sourcePath) {
      setReturnToPath(sourcePath)
    }

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.productId === productId,
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...currentItems, { productId, quantity: 1 }]
    })
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) {
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    )
  }

  function removeFromCart(productId) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId),
    )
  }

  const cartItems = useMemo(
    () =>
      items.flatMap((item) => {
        const product = shopProducts.find(
          (shopProduct) => shopProduct.id === item.productId,
        )
        return product ? [{ ...product, quantity: item.quantity }] : []
      }),
    [items],
  )

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const total = cartItems.reduce(
    (amount, item) => amount + item.price * item.quantity,
    0,
  )

  const value = {
    addToCart,
    cartItems,
    itemCount,
    removeFromCart,
    returnToPath,
    total,
    updateQuantity,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
