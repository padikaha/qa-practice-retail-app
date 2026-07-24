function ProductCard({ product, isSelected, onSelect, onAddToCart, cartQuantity }) {
  const isInStock = product.inventory > 0
  const hasReachedMaximumQuantity = cartQuantity >= product.inventory
  const availability = isInStock ? 'In Stock' : 'Out of Stock'
  const statusClassName = isInStock
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
      <p className={statusClassName}>{availability}</p>
      <p className="product-card__quantity">
        Available quantity: {product.inventory}
      </p>
      <button
        type="button"
        className="product-card__cart-button"
        disabled={!isInStock || hasReachedMaximumQuantity}
        onClick={(event) => {
          event.stopPropagation()
          onAddToCart(product)
        }}
      >
        {isInStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </article>
  )
}

export default ProductCard
