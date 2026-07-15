import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar.jsx'
import ProductList from './components/ProductList.jsx'
import ProductDetails from './components/ProductDetails.jsx'
import ShoppingCart from './components/ShoppingCart.jsx'
import { products } from './data/products.js'

function App() {
  const [searchText, setSearchText] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItems, setCartItems] = useState([])

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

  return (
    <main className="app">
      <header className="page-header">
        <h1>GreenBasket</h1>
        <p>QA Practice Retail Application</p>
      </header>

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
          />
        </div>
      </div>
    </main>
  )
}

export default App
