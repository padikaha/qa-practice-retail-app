function ProductCard({ product }) {
  const statusClassName = product.inStock
    ? 'product-card__status product-card__status--in-stock'
    : 'product-card__status product-card__status--out-of-stock'

  return (
    <article className="product-card">
      <h3>{product.name}</h3>
      <p className="product-card__price">{product.price}</p>
      <p className={statusClassName}>{product.availability}</p>
    </article>
  )
}

export default ProductCard
