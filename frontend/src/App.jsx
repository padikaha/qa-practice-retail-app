import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar.jsx'
import ProductList from './components/ProductList.jsx'
import { products } from './data/products.js'

function App() {
  const [searchText, setSearchText] = useState('')

  const normalizedSearchText = searchText.trim().toLowerCase()
  const filteredProducts = normalizedSearchText
    ? products.filter((product) =>
        product.name.toLowerCase().includes(normalizedSearchText),
      )
    : products

  return (
    <main className="app">
      <header className="page-header">
        <h1>GreenBasket</h1>
        <p>QA Practice Retail Application</p>
      </header>

      <SearchBar searchText={searchText} onSearchChange={setSearchText} />

      <section className="products-section" aria-labelledby="products-heading">
        <h2 id="products-heading">Products</h2>
        <ProductList products={filteredProducts} />
      </section>
    </main>
  )
}

export default App
