import React from "react";
// Import images for better React compatibility
import image_product1 from "../../assets/img/single_product_1.png"; // Adjust the path to your image
import image_product2 from "../../assets/img/single_product_2.png";
import image_product3 from "../../assets/img/single_product_3.png"; // Adjust the path to your image
import image_overlay from "../../assets/img/product_overlay.png";

export default function Product() {
  return (
    <section className="single_product_list">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="single_product_iner">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-6 col-sm-6">
              <div className="single_product_img">
                <img src={image_product1} className="img-fluid" alt="#" />
                <img src={image_overlay} alt="#" className="product_overlay img-fluid" />
              </div>
            </div>
            <div className="col-lg-5 col-sm-6">
              <div className="single_product_content">
                <h5>Started from $10</h5>
                <h2> <a href="#">Printed memory foam 
                    brief modern throw 
                    pillow case</a> </h2>
                <a href="#" className="btn_3">Explore Now</a>
              </div>
            </div>
          </div>
        </div>
        <div className="single_product_iner">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-6 col-sm-6">
              <div className="single_product_img">
                <img src={image_product2} className="img-fluid" alt="#" />
                <img src={image_overlay} alt="#" className="product_overlay img-fluid" />
              </div>
            </div>
            <div className="col-lg-5 col-sm-6">
              <div className="single_product_content">
                <h5>Started from $10</h5>
                <h2> <a href="#">Printed memory foam 
                    brief modern throw 
                    pillow case</a> </h2>
                <a href="#" className="btn_3">Explore Now</a>
              </div>
            </div>
          </div>
        </div>
        <div className="single_product_iner">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-6 col-sm-6">
              <div className="single_product_img">
                <img src={image_product3} className="img-fluid" alt="#" />
                <img src={image_overlay} alt="#" className="product_overlay img-fluid" />
              </div>
            </div>
            <div className="col-lg-5 col-sm-6">
              <div className="single_product_content">
                <h5>Started from $10</h5>
                <h2> <a href="#">Printed memory foam 
                    brief modern throw 
                    pillow case</a> </h2>
                <a href="#" className="btn_3">Explore Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  );
}