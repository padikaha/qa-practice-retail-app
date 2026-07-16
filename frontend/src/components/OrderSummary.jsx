function OrderSummary({ cartItems, totalItemCount, subtotal }) {
  return (
    <section className="order-summary" aria-labelledby="order-summary-heading">
      <h2 id="order-summary-heading">Order Summary</h2>

      <ul className="order-summary__items">
        {cartItems.map((item) => {
          const unitPrice = Number(item.price.replace('$', ''))
          const lineTotal = unitPrice * item.quantity

          return (
            <li key={item.id} className="order-summary__item">
              <div>
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div>
                <p>Unit price: ${unitPrice.toFixed(2)}</p>
                <p>Line total: ${lineTotal.toFixed(2)}</p>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="order-summary__totals">
        <p>Total items: {totalItemCount}</p>
        <p>Order subtotal: ${subtotal.toFixed(2)}</p>
      </div>
    </section>
  )
}

export default OrderSummary
