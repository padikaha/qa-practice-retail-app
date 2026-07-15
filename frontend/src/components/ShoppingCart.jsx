import CartItem from './CartItem.jsx'

function ShoppingCart({
  cartItems,
  totalItemCount,
  subtotal,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
}) {
  return (
    <section className="shopping-cart" aria-labelledby="cart-heading">
      <div className="shopping-cart__header">
        <h2 id="cart-heading">Shopping Cart</h2>
        <p>Total items: {totalItemCount}</p>
      </div>

      {cartItems.length === 0 ? (
        <p className="shopping-cart__empty">Your cart is empty.</p>
      ) : (
        <ul className="shopping-cart__items">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={onIncreaseQuantity}
              onDecrease={onDecreaseQuantity}
              onRemove={onRemoveItem}
            />
          ))}
        </ul>
      )}

      <p className="shopping-cart__subtotal">Cart subtotal: ${subtotal.toFixed(2)}</p>
    </section>
  )
}

export default ShoppingCart
