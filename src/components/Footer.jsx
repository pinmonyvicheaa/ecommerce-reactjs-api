import React from "react";
import Logo from "../assets/img/logo/logo1.png";

export default function Footer() {
  return (
    <footer className="footer_part">
  <div className="footer_iner bg">
    <div className="container">
      <div className="row justify-content-between align-items-center">
        <div className="col-lg-8">
          <div className="footer_menu">
            <div className="footer_logo">
              <a href="index.html"><img src={Logo} alt="Image" /></a>
            </div>
            <div className="footer_menu_item">
              
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="social_icon">
            <a href="#"><i className="fab fa-facebook-f" /></a>&nbsp;
            <a href="#"><i className="fab fa-instagram" /></a>&nbsp;
            <a href="#"><i className="fab fa-google-plus-g" /></a>&nbsp;
            <a href="#"><i className="fab fa-linkedin-in" /></a>&nbsp;
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className=" copyright_part">
    <div className="container ">
      <div className="row ">
        <div className="col-lg-12 ">
          <div className="copyright_text">
            <p>{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              Copyright © All rights reserved | This template is made with <i className="ti-heart" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}</p>
            <div className="copyright_link">
              <a href="#">Turms &amp; Conditions</a>
              <a href="#">FAQ</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>

  );
}
