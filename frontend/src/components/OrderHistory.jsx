import OrderHistoryItem from './OrderHistoryItem.jsx'

function OrderHistory({ orders, onReturnToCatalog }) {
  return (
    <section className="order-history" aria-labelledby="order-history-heading">
      <div className="order-history__header">
        <h2 id="order-history-heading">Order History</h2>
        <button type="button" className="secondary-button" onClick={onReturnToCatalog}>
          Return to Catalog
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="order-history__empty">No orders have been placed yet.</p>
      ) : (
        <div className="order-history__list">
          {orders.map((order) => (
            <OrderHistoryItem key={order.orderNumber} order={order} />
          ))}
        </div>
      )}
    </section>
  )
}

export default OrderHistory
