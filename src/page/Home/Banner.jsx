import React from "react";
import banner from "../../assets/img/banner.png";
import bannerPattern from "../../assets/img/banner_pattern.png";
// Import images for better React compatibility

export default function Banner() {
  return (
    <section className="banner_part">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-5">
            <div className="banner_text">
              <div className="banner_text_iner">
                <h1>Best Suits for men</h1>
                <p>
                  Seamlessly empower fully researched growth strategies and
                  interoperable internal sources.
                </p>
                <a href="#" className="btn_1">
                  Shop now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="banner_img">
        {/* Use imported images for better React compatibility */}
        <img src={banner} alt="High-quality pillow on display" className="img-fluid" />
        <img
          src={bannerPattern}
          alt="Decorative pattern overlay"
          className="pattern_img img-fluid"
        />
      </div>
    </section>
  );
}