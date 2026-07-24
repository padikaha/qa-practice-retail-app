import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar.jsx'
import ProductList from './components/ProductList.jsx'
import ProductDetails from './components/ProductDetails.jsx'
import ShoppingCart from './components/ShoppingCart.jsx'
import CheckoutForm from './components/CheckoutForm.jsx'
import OrderSummary from './components/OrderSummary.jsx'
import OrderConfirmation from './components/OrderConfirmation.jsx'
import OrderHistory from './components/OrderHistory.jsx'
import { products as initialProducts } from './data/products.js'

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [searchText, setSearchText] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [cartMessageByProductId, setCartMessageByProductId] = useState({})
  const [currentView, setCurrentView] = useState('catalog')
  const [orderConfirmation, setOrderConfirmation] = useState(null)
  const [orders, setOrders] = useState([])

  const normalizedSearchText = searchText.trim().toLowerCase()
  const filteredProducts = normalizedSearchText
    ? products.filter((product) =>
        product.name.toLowerCase().includes(normalizedSearchText),
      )
    : products
  const totalItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  )
  const subtotal = cartItems.reduce((total, item) => {
    const unitPrice = Number(item.price.replace('$', ''))

    return total + unitPrice * item.quantity
  }, 0)
  // Product details are looked up from live product state so inventory stays fresh.
  const selectedProductDetails = selectedProduct
    ? products.find((product) => product.id === selectedProduct.id) ?? null
    : null

  function getCartQuantity(productId, items = cartItems) {
    return items.find((item) => item.id === productId)?.quantity ?? 0
  }

  function showMaximumQuantityMessage(productId) {
    setCartMessageByProductId((currentMessages) => ({
      ...currentMessages,
      [productId]: 'Maximum available quantity reached.',
    }))
  }

  function clearCartMessage(productId) {
    setCartMessageByProductId((currentMessages) => {
      if (!currentMessages[productId]) {
        return currentMessages
      }

      const updatedMessages = { ...currentMessages }
      delete updatedMessages[productId]

      return updatedMessages
    })
  }

  function handleAddToCart(product) {
    const currentProduct = products.find((item) => item.id === product.id)
    const currentCartQuantity = getCartQuantity(product.id)

    if (!currentProduct || currentProduct.inventory <= 0) {
      return
    }

    if (currentCartQuantity >= currentProduct.inventory) {
      showMaximumQuantityMessage(product.id)

      return
    }

    clearCartMessage(product.id)

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)
      const latestCartQuantity = existingItem?.quantity ?? 0

      if (latestCartQuantity >= currentProduct.inventory) {
        return currentItems
      }

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...currentItems, { ...currentProduct, quantity: 1 }]
    })
  }

  function handleIncreaseQuantity(productId) {
    const currentProduct = products.find((product) => product.id === productId)
    const currentQuantity = getCartQuantity(productId)

    if (!currentProduct) {
      return
    }

    if (currentQuantity >= currentProduct.inventory) {
      showMaximumQuantityMessage(productId)

      return
    }

    clearCartMessage(productId)

    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== productId || item.quantity >= currentProduct.inventory) {
          return item
        }

        return { ...item, quantity: item.quantity + 1 }
      }),
    )
  }

  function handleDecreaseQuantity(productId) {
    clearCartMessage(productId)

    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity >= 1),
    )
  }

  function handleRemoveItem(productId) {
    clearCartMessage(productId)

    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    )
  }

  function handleStartCheckout() {
    if (cartItems.length > 0) {
      setCurrentView('checkout')
    }
  }

  function handleCancelCheckout() {
    setCurrentView('catalog')
  }

  function handlePlaceOrder(customerInfo) {
    const hasUnavailableCartQuantity = cartItems.some((item) => {
      const currentProduct = products.find((product) => product.id === item.id)

      return !currentProduct || item.quantity > currentProduct.inventory
    })

    if (hasUnavailableCartQuantity) {
      return
    }

    const orderNumber = `GB-${Date.now()}-${orders.length + 1}`
    const orderDateTime = new Date().toLocaleString()
    const orderItems = cartItems.map((item) => {
      const unitPrice = Number(item.price.replace('$', ''))

      return {
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPrice,
        lineTotal: unitPrice * item.quantity,
      }
    })
    const orderSubtotal = orderItems.reduce(
      (total, item) => total + item.lineTotal,
      0,
    )
    // The order stores purchased values before live inventory changes.
    const completedOrder = {
      orderNumber,
      orderDateTime,
      customer: {
        fullName: customerInfo.fullName,
        email: customerInfo.email,
        phone: customerInfo.phone,
      },
      deliveryAddress: {
        streetAddress: customerInfo.streetAddress,
        city: customerInfo.city,
        state: customerInfo.state,
        zipCode: customerInfo.zipCode,
      },
      items: orderItems,
      totalItemCount,
      subtotal: orderSubtotal,
      status: 'Confirmed',
    }

    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        const orderedItem = cartItems.find((item) => item.id === product.id)

        if (!orderedItem) {
          return product
        }

        return {
          ...product,
          inventory: Math.max(product.inventory - orderedItem.quantity, 0),
        }
      }),
    )
    setOrders((currentOrders) => [completedOrder, ...currentOrders])
    setOrderConfirmation(completedOrder)
    setCartItems([])
    setCartMessageByProductId({})
    setCurrentView('confirmation')
  }

  function handleContinueShopping() {
    setOrderConfirmation(null)
    setCurrentView('catalog')
  }

  function handleViewOrderHistory() {
    setCurrentView('history')
  }

  function handleReturnToCatalog() {
    setCurrentView('catalog')
  }

  function renderHeader(showOrderHistoryButton = true) {
    return (
      <header className="page-header">
        <div>
          <h1>GreenBasket</h1>
          <p>QA Practice Retail Application</p>
        </div>

        {showOrderHistoryButton && (
          <button
            type="button"
            className="secondary-button page-header__history-button"
            onClick={handleViewOrderHistory}
          >
            Order History
          </button>
        )}
      </header>
    )
  }

  if (currentView === 'checkout') {
    return (
      <main className="app">
        {renderHeader()}

        <div className="checkout-layout">
          <CheckoutForm
            onPlaceOrder={handlePlaceOrder}
            onCancelCheckout={handleCancelCheckout}
          />
          <OrderSummary
            cartItems={cartItems}
            totalItemCount={totalItemCount}
            subtotal={subtotal}
          />
        </div>
      </main>
    )
  }

  if (currentView === 'confirmation' && orderConfirmation) {
    return (
      <main className="app">
        {renderHeader()}

        <OrderConfirmation
          order={orderConfirmation}
          onContinueShopping={handleContinueShopping}
        />
      </main>
    )
  }

  if (currentView === 'history') {
    return (
      <main className="app">
        {renderHeader(false)}

        <OrderHistory orders={orders} onReturnToCatalog={handleReturnToCatalog} />
      </main>
    )
  }

  return (
    <main className="app">
      {renderHeader()}

      <SearchBar searchText={searchText} onSearchChange={setSearchText} />

      {!selectedProduct && (
        <div className="empty-details-placement">
          <ProductDetails selectedProduct={selectedProductDetails} />
        </div>
      )}

      <div className="main-content">
        <div className="catalog-layout">
          <section className="products-section" aria-labelledby="products-heading">
            <h2 id="products-heading">Products</h2>
            <ProductList
              products={filteredProducts}
              selectedProductId={selectedProduct?.id}
              onProductSelect={setSelectedProduct}
              onAddToCart={handleAddToCart}
              cartItems={cartItems}
            />
          </section>

          {selectedProduct && (
            <ProductDetails selectedProduct={selectedProductDetails} />
          )}
        </div>

        <div className="cart-panel">
          <ShoppingCart
            cartItems={cartItems}
            totalItemCount={totalItemCount}
            subtotal={subtotal}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleStartCheckout}
            cartMessageByProductId={cartMessageByProductId}
          />
        </div>
      </div>
    </main>
  )
}

export default App
