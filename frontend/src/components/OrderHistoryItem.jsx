import { useState } from 'react'

function OrderHistoryItem({ order }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <article className="order-history-item">
      <div className="order-history-item__summary">
        <div>
          <h3>{order.orderNumber}</h3>
          <p>{order.orderDateTime}</p>
          <p>Customer: {order.customer.fullName}</p>
        </div>

        <div>
          <p>Total items: {order.totalItemCount}</p>
          <p>Order subtotal: ${order.subtotal.toFixed(2)}</p>
          <p>Status: {order.status}</p>
        </div>
      </div>

      <button
        type="button"
        className="secondary-button order-history-item__toggle"
        onClick={() => setIsExpanded((currentValue) => !currentValue)}
      >
        {isExpanded ? 'Hide Details' : 'View Details'}
      </button>

      {isExpanded && (
        <div className="order-history-item__details">
          <section>
            <h4>Customer Contact</h4>
            <p>{order.customer.email}</p>
            <p>{order.customer.phone}</p>
          </section>

          <section>
            <h4>Delivery Address</h4>
            <p>{order.deliveryAddress.streetAddress}</p>
            <p>
              {order.deliveryAddress.city}, {order.deliveryAddress.state}{' '}
              {order.deliveryAddress.zipCode}
            </p>
          </section>

          <section>
            <h4>Ordered Items</h4>
            <ul className="order-history-item__items">
              {order.items.map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <div>
                    <p>Unit price: ${item.unitPrice.toFixed(2)}</p>
                    <p>Line total: ${item.lineTotal.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="order-history-item__subtotal">
              Final subtotal: ${order.subtotal.toFixed(2)}
            </p>
          </section>
        </div>
      )}
    </article>
  )
}

export default OrderHistoryItem
