function ProductDetails({ selectedProduct }) {
  if (!selectedProduct) {
    return (
      <aside className="product-details product-details--empty">
        <p className="product-details__empty">
          Select a product to view product details.
        </p>
      </aside>
    )
  }

  const isInStock = selectedProduct.inventory > 0
  const availability = isInStock ? 'In Stock' : 'Out of Stock'
  const statusClassName = isInStock
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
            <span className={statusClassName}>{availability}</span>
          </dd>
        </div>
        <div>
          <dt>Available Quantity</dt>
          <dd>{selectedProduct.inventory}</dd>
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
