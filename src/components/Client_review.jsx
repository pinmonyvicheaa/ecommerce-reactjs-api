import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Client from "../assets/img/client.png";
import Client1 from "../assets/img/client_1.png";
import Client2 from "../assets/img/client_2.png";

export default function Client_review() {
  // Slider settings
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite looping
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Enable auto-play
    autoplaySpeed: 3000, // Auto-play interval in milliseconds
    arrows: true, // Show navigation arrows
  };

  return (
    <section className="client_review">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Slick Carousel */}
            <Slider {...settings}>
              <div className="single_client_review">
                <div className="client_img">
                  <img src={Client} alt="Client" />
                </div>
                <p>
                  "Working in conjunction with humanitarian aid agencies, we have supported programmes to help alleviate human suffering."
                </p>
                <h5>- Micky Mouse</h5>
              </div>
              <div className="single_client_review">
                <div className="client_img">
                  <img src={Client1} alt="Client 1" />
                </div>
                <p>
                  "Working in conjunction with humanitarian aid agencies, we have supported programmes to help alleviate human suffering."
                </p>
                <h5>- Micky Mouse</h5>
              </div>
              <div className="single_client_review">
                <div className="client_img">
                  <img src={Client2} alt="Client 2" />
                </div>
                <p>
                  "Working in conjunction with humanitarian aid agencies, we have supported programmes to help alleviate human suffering."
                </p>
                <h5>- Micky Mouse</h5>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}