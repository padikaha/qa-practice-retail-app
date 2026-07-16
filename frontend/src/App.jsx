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
import { products } from './data/products.js'

function App() {
  const [searchText, setSearchText] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItems, setCartItems] = useState([])
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

  function handleAddToCart(product) {
    if (!product.inStock) {
      return
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...currentItems, { ...product, quantity: 1 }]
    })
  }

  function handleIncreaseQuantity(productId) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )
  }

  function handleDecreaseQuantity(productId) {
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

    setOrders((currentOrders) => [completedOrder, ...currentOrders])
    setOrderConfirmation(completedOrder)
    setCartItems([])
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
          <ProductDetails selectedProduct={selectedProduct} />
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
            />
          </section>

          {selectedProduct && <ProductDetails selectedProduct={selectedProduct} />}
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
          />
        </div>
      </div>
    </main>
  )
}

export default App
