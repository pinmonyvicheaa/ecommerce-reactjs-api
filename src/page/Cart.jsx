import React, { useEffect, useState } from "react";

// Reusable Cart Item Component
const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const price = isNaN(parseFloat(item.price)) ? 0 : parseFloat(item.price);

  const handleIncrement = () => {
    const newQuantity = Math.min(quantity + 1, 10);
    setQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity);
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(quantity - 1, 1);
    setQuantity(newQuantity);
    onQuantityChange(item.id, newQuantity);
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <tr>
      <td>
        <div className="media d-flex align-items-center">
          <div className="mr-3" style={{ width: "80px" }}>
            <img src={item.image_url} alt={item.name} className="img-fluid" />
          </div>
          <div className="media-body">
            <p>{item.name}</p>
          </div>
        </div>
      </td>
      <td>
        <h5>${price.toFixed(2)}</h5>
      </td>
      <td>
        <div className="product_count d-flex align-items-center">
          <button onClick={handleDecrement} className="buttonbg px-2">-</button>
          <input
            className="input-number text-center mx-2"
            type="text"
            value={quantity}
            readOnly
            style={{ width: "40px" }}
          />
          <button onClick={handleIncrement} className="buttonbg px-2">+</button>
        </div>
      </td>
      <td>
        <h5>${(price * quantity).toFixed(2)}</h5>
        <button
          onClick={handleRemove}
          className="btn btn-sm btn-danger mt-2"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]").map(item => ({
      ...item,
      price: parseFloat(item.price),
      quantity: item.quantity || 1,
    }));
    setCartItems(storedCart);
  }, []);

  // Update total whenever cartItems change
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  // Handle quantity change
  const handleQuantityChange = (id, newQty) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle item removal
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div>
      {/* Breadcrumb Section */}
      <section className="breadcrumb_part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb_iner">
                <h2>Cart List</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Area */}
      <section className="cart_area section_padding">
        <div className="container">
          <div className="cart_inner">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length > 0 ? (
                    cartItems.map(item => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemoveItem}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center text-muted">
                        Your cart is empty.
                      </td>
                    </tr>
                  )}
                  <tr className="bottom_button">
                    <td>
                      <button className="btn_1">Update Cart</button>
                    </td>
                    <td />
                    <td>
                      <h5>Subtotal</h5>
                    </td>
                    <td>
                      <h5>${totalPrice.toFixed(2)}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td />
                    <td>
                      <h5>Total</h5>
                    </td>
                    <td>
                      <h5>${totalPrice.toFixed(2)}</h5>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="checkout_btn_inner float-right">
                <a href="/" className="btn_1 buttonbg1">Continue Shopping</a>
                <a href="/checkout" className="btn_1 checkout_btn_1 buttonbg1">Proceed to Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
