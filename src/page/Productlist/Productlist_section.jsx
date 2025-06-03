import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import { useCategory } from "../../context/CategoryContext";

const Productlist_section = () => {
  const { products, fetchProducts } = useProduct();
  const { categories, fetchCategories } = useCategory();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.name);
    setSelectedCategoryId(category.id);
    setIsDropdownVisible(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category_id === selectedCategoryId;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = storedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      storedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    window.dispatchEvent(new Event("storage"));

    setPopupMessage(`${product.name} has been added to your cart.`);
    setTimeout(() => setPopupMessage(""), 3000);
  };

  return (
    <div className="container-fluid pt-4">
      {/* Title */}
      <div className="text-center mb-4">
        <h5 className="section-title">
          <span className="px-3 py-1 bg-warning text-dark rounded">Product List</span>
        </h5>
      </div>

      {/* Search & Filter */}
      <div className="row mb-4 px-xl-4">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-6 mb-2 position-relative">
          <div
            className="form-control d-flex justify-content-between align-items-center"
            onClick={toggleDropdown}
            style={{ cursor: "pointer" }}
          >
            {selectedCategory} <i className="fas fa-caret-down"></i>
          </div>
          {isDropdownVisible && (
            <div className="dropdown-menu show w-100">
              <button
                className="dropdown-item"
                onClick={() => handleCategorySelect({ name: "All", id: null })}
              >
                All
              </button>
              {categories
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category) => (
                  <button
                    key={category.id}
                    className="dropdown-item"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category.name}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Product List */}
      <div className="row px-xl-4 pb-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-lg-3 col-md-4 col-sm-6 pb-4" key={product.id}>
              <div className="card product-item border shadow-sm">
                <div className="card-header product-img bg-light border p-0 position-relative">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="img-fluid w-100 rounded-top"
                    style={{ maxHeight: "180px", objectFit: "contain" }}
                  />
                </div>
                <div className="card-body text-center p-3 bg-light">
                  <h6 className="text-truncate text-dark" title={product.name}>
                    {product.name}
                  </h6>
                  <h6 className="text-success">${product.price}</h6>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center bg-white p-2">
                  <button
                    className="btn btn-sm btn-info text-white"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    View Details
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted">No products found.</div>
        )}
      </div>

      {/* Popup */}
      {popupMessage && (
        <div
          className="popup-message shadow-lg"
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#17a2b8",
            color: "white",
            padding: "15px 30px",
            borderRadius: "8px",
            fontSize: "1rem",
            zIndex: 1050,
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div>{popupMessage}</div>
          <button
            onClick={() => navigate("/cart")}
            style={{
              marginTop: "10px",
              backgroundColor: "#ffc107",
              color: "#212529",
              border: "none",
              padding: "5px 15px",
              fontSize: "0.9rem",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Go to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Productlist_section;