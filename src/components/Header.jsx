import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import Logo from "../assets/img/logo/logo1.png";
import { useNavigate } from "react-router-dom"; // To navigate after logout

export default function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isLogoutConfirmVisible, setIsLogoutConfirmVisible] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // 👇 Force re-render when `user` changes
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    setCurrentUser(user); // Update state when user changes
  }, [user]);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleShowLogoutConfirm = () => {
    setIsLogoutConfirmVisible(true);
  };

  const handleHideLogoutConfirm = () => {
    setIsLogoutConfirmVisible(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentUser(null);
      setIsLogoutConfirmVisible(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <header className="main_menu home_menu" style={{ backgroundColor: "#D8BFD8" }}>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-12">
            <nav className="navbar navbar-expand-lg navbar-light">
              <a className="navbar-brand" href="/">
                <img src={Logo} alt="logo" width="100" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="menu_icon">
                  <i className="fas fa-bars" />
                </span>
              </button>
              <div
                className="collapse navbar-collapse main-menu-item"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/about">
                      About
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="blog.html"
                      id="navbarDropdown_1"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Product
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown_1">
                      <a className="dropdown-item" href="/productlist">
                        Product List
                      </a>
                      <a className="dropdown-item" href="/productdetails">
                        Product Details
                      </a>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/contact">
                      Contact
                    </a>
                  </li>

                  {/* ✅ Show Logout only for customers */}
                  <li className="nav-item">
                    {currentUser ? (
                      currentUser.role === "customer" ? (
                        <button className="nav-link" onClick={handleShowLogoutConfirm}>
                          Logout
                        </button>
                      ) : (
                        <a className="nav-link" href="/login">
                          Login
                        </a>
                      )
                    ) : (
                      <a className="nav-link" href="/login">
                        Login
                      </a>
                    )}
                  </li>
                </ul>
              </div>
              <div className="hearer_icon d-flex align-items-center">
                <a id="search_1" href="javascript:void(0)" onClick={toggleSearch}>
                  <i className="ti-search" />
                </a>
                <a href="/cart">
                  <i className="flaticon-shopping-cart-black-shape" />
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {isSearchVisible && (
        <div className="search_input" id="search_input_box">
          <div className="container">
            <form className="d-flex justify-content-between search-inner">
              <input
                type="text"
                className="form-control"
                id="search_input"
                placeholder="Search Here"
              />
              <button type="submit" className="btn" />
              <span
                className="ti-close"
                id="close_search"
                title="Close Search"
                onClick={toggleSearch}
              />
            </form>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {isLogoutConfirmVisible && (
        <div className="logout-confirmation-modal">
          <div className="modal-content">
            <h3>Are you sure you want to log out?</h3>
            <button className="btn-yes" onClick={handleLogout}>Yes</button>
            <button className="btn-no" onClick={handleHideLogoutConfirm}>No</button>
          </div>
        </div>
      )}
    </header>
  );
}
