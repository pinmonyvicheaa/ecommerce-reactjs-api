import React, { useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import SingleProductImage from "../../assets/img/product/single_product.png"; // Correctly import the image
import Single_product1 from "../../assets/img/product_details/prodect_details_1.png";
import Single_product2 from "../../assets/img/product_details/prodect_details_2.png";

export default function ProductDetailsSection() {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    // Implement your logic to add the product to the cart here
    console.log(`Added ${quantity} items to the cart.`);
  };

  return (
    <div>
      {/* Breadcrumb Section */}
      <section className="breadcrumb_part single_product_breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb_iner"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Single Product Area */}
      <div className="product_image_area">
        <div className="container">
          <div className="row justify-content-center">
            {/* Product Image Carousel */}
            <div className="col-lg-12">
              <OwlCarousel
                className="product_img_slide owl-carousel"
                items={1}
                loop
                margin={10}
                nav
                dots
                style={{ maxWidth: "600px", margin: "0 auto" }} // Center and limit carousel width
              >
                {[SingleProductImage, Single_product1, Single_product2].map((image, index) => (
                  <div key={index} className="single_product_img">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="img-fluid product_image"
                      style={{
                        width: "100%",
                        height: "400px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </OwlCarousel>
            </div>

            {/* Product Details */}
            <div className="col-lg-8">
              <div className="single_product_text text-center">
                <h3>Foam Filling Cotton Slow Rebound Pillows</h3>
                <p>
                  Seamlessly empower fully researched growth strategies and interoperable internal or “organic” sources.
                  Credibly innovate granular internal or “organic” sources whereas high standards in web-readiness.
                  Energistically scale future-proof core competencies vis-a-vis impactful experiences.
                  Dramatically synthesize integrated schemas with optimal networks.
                </p>

                {/* Quantity and Price */}
                <div className="card_area">
                  <div className="product_count_area">
                    <p>Quantity</p>
                    <div className="product_count d-inline-block">
                      <span
                        className="product_count_item inumber-decrement"
                        onClick={handleDecrement}
                        aria-label="Decrease quantity"
                      >
                        <i className="ti-minus"></i>
                      </span>
                      <input
                        className="product_count_item input-number"
                        type="text"
                        value={quantity}
                        readOnly
                        aria-label="Current quantity"
                      />
                      <span
                        className="product_count_item number-increment"
                        onClick={handleIncrement}
                        aria-label="Increase quantity"
                      >
                        <i className="ti-plus"></i>
                      </span>
                    </div>
                    <p>$5</p>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="add_to_cart">
                    <button className="btn_3" onClick={handleAddToCart}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}