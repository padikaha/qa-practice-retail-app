import ProductCard from './ProductCard.jsx'

function ProductList({
  products,
  selectedProductId,
  onProductSelect,
  onAddToCart,
}) {
  if (products.length === 0) {
    return <p className="no-products">No products found.</p>
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={product.id === selectedProductId}
          onSelect={onProductSelect}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}

export default ProductList
