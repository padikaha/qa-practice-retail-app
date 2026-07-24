function CartItem({ item, onIncrease, onDecrease, onRemove, message }) {
  const unitPrice = Number(item.price.replace('$', ''))
  const lineTotal = unitPrice * item.quantity
  const hasReachedMaximumQuantity = item.quantity >= item.inventory
  const inventoryMessage = hasReachedMaximumQuantity
    ? 'Maximum available quantity reached.'
    : message

  return (
    <li className="cart-item">
      <div className="cart-item__details">
        <h3>{item.name}</h3>
        <p>Unit price: ${unitPrice.toFixed(2)}</p>
        <p>Line total: ${lineTotal.toFixed(2)}</p>
        <p>Available quantity: {item.inventory}</p>
      </div>

      <div className="cart-item__actions">
        <div className="cart-item__quantity-controls">
          <button type="button" onClick={() => onDecrease(item.id)}>
            -
          </button>
          <span>Quantity: {item.quantity}</span>
          <button
            type="button"
            disabled={hasReachedMaximumQuantity}
            onClick={() => onIncrease(item.id)}
          >
            +
          </button>
        </div>
        {inventoryMessage && (
          <p className="cart-item__message">{inventoryMessage}</p>
        )}
        <button
          type="button"
          className="cart-item__remove"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </li>
  )
}

export default CartItem
