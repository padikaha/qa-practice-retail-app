function ProductCard({ product, isSelected, onSelect, onAddToCart }) {
  const statusClassName = product.inStock
    ? 'product-card__status product-card__status--in-stock'
    : 'product-card__status product-card__status--out-of-stock'
  const cardClassName = isSelected
    ? 'product-card product-card--selected'
    : 'product-card'

  return (
    <article
      className={cardClassName}
      onClick={() => onSelect(product)}
      tabIndex="0"
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          onSelect(product)
        }
      }}
    >
      <h3>{product.name}</h3>
      <p className="product-card__price">{product.price}</p>
      <p className={statusClassName}>{product.availability}</p>
      <button
        type="button"
        className="product-card__cart-button"
        disabled={!product.inStock}
        onClick={(event) => {
          event.stopPropagation()
          onAddToCart(product)
        }}
      >
        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </article>
  )
}

export default ProductCard
