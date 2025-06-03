import React from "react";
import feature_icon1 from "../assets/img/icon/feature_icon_1.svg";
import feature_icon2 from "../assets/img/icon/feature_icon_2.svg";
import feature_icon3 from "../assets/img/icon/feature_icon_3.svg";
import feature_icon4 from "../assets/img/icon/feature_icon_4.svg";


// Import images for better React compatibility

export default function Feature() {
  return (
    <section className="feature_part section_padding">
  <div className="container">
    <div className="row justify-content-between">
      <div className="col-lg-6">
        <div className="feature_part_tittle">
          <h3>Credibly innovate granular
            internal or organic sources
            whereas standards.</h3>
        </div>
      </div>
      <div className="col-lg-5">
        <div className="feature_part_content">
          <p>Seamlessly empower fully researched growth strategies and interoperable internal or “organic” sources. Credibly innovate granular internal or “organic” sources whereas high standards in web-readiness.</p>
        </div>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-lg-3 col-sm-6">
        <div className="single_feature_part">
          <img src={feature_icon1} alt="#" />
          <h4>Credit Card Support</h4>
        </div>
      </div>
      <div className="col-lg-3 col-sm-6">
        <div className="single_feature_part">
        <img src={feature_icon2} alt="#" />
          <h4>Online Order</h4>
        </div>
      </div>
      <div className="col-lg-3 col-sm-6">
        <div className="single_feature_part">
            <img src={feature_icon3} alt="#" />
          <h4>Free Delivery</h4>
        </div>
      </div>
      <div className="col-lg-3 col-sm-6">
        <div className="single_feature_part">
          <img src={feature_icon4} alt="#" />
          <h4>Product with Gift</h4>
        </div>
      </div>
    </div>
  </div>
</section>

  );
}