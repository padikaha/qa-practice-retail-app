import './App.css'
import ProductList from './components/ProductList.jsx'
import { products } from './data/products.js'

function App() {
  return (
    <main className="app">
      <header className="page-header">
        <h1>GreenBasket</h1>
        <p>QA Practice Retail Application</p>
      </header>

      <section className="products-section" aria-labelledby="products-heading">
        <h2 id="products-heading">Products</h2>
        <ProductList products={products} />
      </section>
    </main>
  )
}

export default App
