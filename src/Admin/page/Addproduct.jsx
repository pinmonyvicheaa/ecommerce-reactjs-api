import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductContext"; // Import ProductContext
import { useCategory } from "../../context/CategoryContext"; // Import CategoryContext

export default function Addproduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "", // Store category ID
    image_url: null,
  });

  const { createProduct } = useProduct(); // Get the addProduct function from context
  const { categories, loading, error, fetchCategories } = useCategory(); // Get categories from CategoryContext
  const navigate = useNavigate();

  const fetchedOnce = useRef(false); // Track if categories have already been fetched

  // Fetch categories only once on mount
  useEffect(() => {
    if (!fetchedOnce.current) {
      fetchCategories();
      fetchedOnce.current = true; // Mark as fetched
    }
  }, [fetchCategories]); // Only run when component is mounted

   // Debug: Check categories and loading state
   useEffect(() => {
    console.log("Categories:", categories); // Log the categories
    console.log("Loading:", loading); // Log the loading state
    console.log("Error:", error); // Log if there's any error
  }, [categories, loading, error]); // Run this effect when categories or loading/error change


  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData object to handle file uploads
    const newProduct = new FormData();
    newProduct.append("name", formData.name);
    newProduct.append("description", formData.description);
    newProduct.append("price", formData.price);
    newProduct.append("stock", formData.stock);
    newProduct.append("category_id", formData.category); // Use category ID
    if (formData.image_url) {
      newProduct.append("image_url", formData.image_url);
    }

    try {
      await createProduct(newProduct); // Call addProduct from context
      navigate("/admin/viewproduct"); // Redirect to View Products page after successful addition
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h4 className="text-center">Add Product</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="pname">Product Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Product Name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="pdesc">Description</label>
                <textarea
                  rows="3"
                  name="description"
                  placeholder="Enter Description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mt-3">
                <label htmlFor="pprice">Price</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter Product Price"
                  className="form-control"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mt-3">
                <label htmlFor="pstock">Stock</label>
                <input
                  type="number"
                  name="stock"
                  placeholder="Enter Product Stock"
                  className="form-control"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mt-3">
                <label htmlFor="pcategory">Category</label>
                <select
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Category</option>
                  {loading ? (
                    <option>Loading categories...</option>
                  ) : error ? (
                    <option>{error}</option>
                  ) : (
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div className="col-md-6 mt-3">
                <label htmlFor="pimg">Upload Product image_url</label>
                <input
                  type="file"
                  name="image_url"
                  className="form-control-file"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-12 mt-3 text-center">
                <button type="submit" name="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
