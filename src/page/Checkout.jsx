import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]").map(
      (item) => ({
        ...item,
        price: parseFloat(item.price),
        quantity: item.quantity || 1,
      })
    );
    setCartItems(storedCart);

    const total = storedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  }, []);

  const handleStaticABAPayment = () => {
    // === Fixed static ABA demo order (must match pre-generated hash)
    const merchantId = "YOUR_Merchant_Id"; // Replace with your sandbox merchant_id
    const orderId = "INV_123456"; // Fixed order ID
    const amount = "25.00"; // Fixed amount as string
    const returnUrl = "http://localhost:3000/confirmation";

    // Pre-generated MD5 hash: md5(order_id + merchant_id + amount + return_url + tran_password)
    const hash = "YOUR_HASH"; // Replace with your own computed hash or Public Key

    const form = document.createElement("form");
    form.method = "post";
    form.action = "https://sandbox.payway.com.kh/paygate/check/checkout.sv";

    const fields = {
      merchant_id: merchantId,
      order_id: orderId,
      amount: amount,
      return_url: returnUrl,
      hash: hash,
    };

    for (let key in fields) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = fields[key];
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div>
      {/* breadcrumb part start */}
      <section className="breadcrumb_part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb_iner">
                <h2>checkout</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* breadcrumb part end */}

      {/*================Checkout Area =================*/}
      <section className="checkout_area section_padding">
        <div className="container">
          <div className="billing_details">
            <div className="row">
              <div className="col-lg-8">
                <h3>Billing Details</h3>
                <form
                  className="row contact_form"
                  action="#"
                  method="post"
                  noValidate="novalidate"
                >
                  <div className="col-md-6 form-group p_star">
                    <input
                      type="text"
                      className="form-control"
                      id="first"
                      name="name"
                    />
                    <span
                      className="placeholder"
                      data-placeholder="First name"
                    />
                  </div>
                  <div className="col-md-6 form-group p_star">
                    <input
                      type="text"
                      className="form-control"
                      id="last"
                      name="name"
                    />
                    <span
                      className="placeholder"
                      data-placeholder="Last name"
                    />
                  </div>
                  <div className="col-md-6 form-group p_star">
                    <input
                      type="text"
                      className="form-control"
                      id="number"
                      name="number"
                    />
                    <span
                      className="placeholder"
                      data-placeholder="Phone number"
                    />
                  </div>
                  <div className="col-md-6 form-group p_star">
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                    />
                    <span
                      className="placeholder"
                      data-placeholder="Email Address"
                    />
                  </div>
                  <div className="col-md-12 form-group p_star">
                    <select className="country_select">
                      <option value={1}>Country</option>
                      <option value={2}>Country</option>
                      <option value={4}>Country</option>
                    </select>
                  </div>
                  <div className="col-md-12 form-group p_star">
                    <input
                      type="text"
                      className="form-control"
                      id="add"
                      name="add"
                    />
                    <span
                      className="placeholder"
                      data-placeholder="Address line"
                    />
                  </div>
                  <div className="col-md-12 form-group p_star">
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                    />
                    <span
                      className="placeholder"
                      data-placeholder="Town/City"
                    />
                  </div>
                  <div className="col-md-12 form-group p_star">
                    <select className="country_select">
                      <option value={1}>District</option>
                      <option value={2}>District</option>
                      <option value={4}>District</option>
                    </select>
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      name="zip"
                      placeholder="Postcode/ZIP"
                    />
                  </div>
                </form>
              </div>

              <div className="col-lg-4">
                <div className="order_box">
                  <h2>Your Order</h2>
                  <ul className="list">
                    <li>
                      <a href="#">
                        Product <span>Total</span>
                      </a>
                    </li>
                    {cartItems.map((item, index) => (
                      <li key={index}>
                        <a href="#">
                          {item.name}{" "}
                          <span className="middle">x {item.quantity}</span>
                          <span className="last">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <ul className="list list_2">
                    <li>
                      <a href="#">
                        Subtotal <span>${subtotal.toFixed(2)}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Total <span>${subtotal.toFixed(2)}</span>
                      </a>
                    </li>
                  </ul>

                  {/* PayPal Sandbox Integration */}
                  <PayPalScriptProvider
                    options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: subtotal.toFixed(2),
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                          alert(
                            "Transaction completed by " +
                              details.payer.name.given_name
                          );
                          localStorage.removeItem("cart");
                          window.location.href = "/confirmation";
                        });
                      }}
                    />
                  </PayPalScriptProvider>

                  {/* ABA PayWay Button */}
                  <button
                    className="btn_3 mt-3 w-100"
                    onClick={handleStaticABAPayment}
                  >
                    Pay with ABA PayWay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*================End Checkout Area =================*/}
    </div>
  );
}
