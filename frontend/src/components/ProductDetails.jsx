function ProductDetails({ selectedProduct }) {
  if (!selectedProduct) {
    return (
      <aside className="product-details">
        <p className="product-details__empty">
          Select a product to view product details.
        </p>
      </aside>
    )
  }

  const statusClassName = selectedProduct.inStock
    ? 'product-details__status product-details__status--in-stock'
    : 'product-details__status product-details__status--out-of-stock'

  return (
    <aside className="product-details">
      <h2>Product Details</h2>
      <dl>
        <div>
          <dt>Product Name</dt>
          <dd>{selectedProduct.name}</dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd>{selectedProduct.price}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{selectedProduct.category}</dd>
        </div>
        <div>
          <dt>SKU</dt>
          <dd>{selectedProduct.sku}</dd>
        </div>
        <div>
          <dt>Stock Status</dt>
          <dd>
            <span className={statusClassName}>{selectedProduct.availability}</span>
          </dd>
        </div>
        <div>
          <dt>Description</dt>
          <dd>{selectedProduct.description}</dd>
        </div>
      </dl>
    </aside>
  )
}

export default ProductDetails
