function OrderConfirmation({ order, onContinueShopping }) {
  return (
    <section className="order-confirmation" aria-labelledby="confirmation-heading">
      <h2 id="confirmation-heading">Order Confirmation</h2>
      <p className="order-confirmation__message">Thank you for your order.</p>

      <dl>
        <div>
          <dt>Order Number</dt>
          <dd>{order.orderNumber}</dd>
        </div>
        <div>
          <dt>Customer Name</dt>
          <dd>{order.customer.fullName}</dd>
        </div>
        <div>
          <dt>Total Item Count</dt>
          <dd>{order.totalItemCount}</dd>
        </div>
        <div>
          <dt>Order Subtotal</dt>
          <dd>${order.subtotal.toFixed(2)}</dd>
        </div>
      </dl>

      <button type="button" className="primary-button" onClick={onContinueShopping}>
        Continue Shopping
      </button>
    </section>
  )
}

export default OrderConfirmation
