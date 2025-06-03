import React from "react";
import video from "../../assets/img/about_us_video.png"; // Ensure this file exists

export default function Breadcrumb() {
  return (
    <>
      {/* Breadcrumb Section */}
      <section className="breadcrumb_part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb_iner">
                <h2>About</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about_us padding_top">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="about_us_content">
                <h5>Our Mission</h5>
                <h3>
                  Donec imperdiet congue orci consequat mattis. Donec rutrum
                  porttitor sollicitudin. Pellentesque id dolor tempor sapien
                  feugiat ultrices nec sed neque.
                </h3>
                <div className="about_us_video">
                  <img
                    src={video}
                    alt="About Us Video Thumbnail"
                    className="img-fluid"
                  />
                  <a
                    className="about_video_icon popup-youtube"
                    href="https://www.youtube.com/watch?v=DWHB6nTyKDI"
                  >
                    {/* Add an icon or text here if needed */}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}