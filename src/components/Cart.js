import React from "react";

const Cart = props => {
  const { products, subtotal, onCheckout, loading } = props;
  const nodes = products.map((item, key) => (
    <li key={key}>
      {item.title} |  {item.price} x {item.quantity}
    </li>
  ));
  return (
    <div>
      <h3>Your Cart</h3>
      <ul>{nodes}</ul>
      <div>Total: {subtotal}</div>
      <div>
        <button onClick={onCheckout} disabled={subtotal <= 0.0 || loading}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
