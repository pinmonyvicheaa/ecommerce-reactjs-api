import React, { useEffect } from "react";
import { useProduct } from "../../context/ProductContext";
import { useCategory } from "../../context/CategoryContext"; // Import Category Context
import { useNavigate } from "react-router-dom";

export default function Viewproduct() {
  const { products, fetchProducts, deleteProduct } = useProduct();
  const { categories, fetchCategories  } = useCategory(); // Get categories from context
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(); // Fetch products when component mounts
    fetchCategories(); // Fetch categories to map category IDs to names
  }, [fetchProducts]);

  // Handle product deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      fetchProducts(); // Refresh product list after deletion
    }
  };

  // Function to find category name by ID
  const getCategoryNameById = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown Category"; // Return category name or "Unknown" if not found
  };

  return (
    <div className="container-fluid body-area mt-5">
      <div className="row mt-2"></div>
      <div className="row">
        <div className="col-md-12 col-sm-12 view-area mt-2 p-1">
          <div className="card">
            <div className="card-header">
              <h4 className="text-center">View Products</h4>
            </div>
            <div className="card-body">
              <table className="table table-responsive table-striped table-bordered w-100 d-block d-md-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Image</th>
                    <th>Product Quantity</th>
                    <th>Product Description</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="img-thumbnail"
                          style={{ height: "100px", width: "100px" }}
                        />
                      </td>
                      <td>{product.stock}</td>
                      <td>
                        <div
                          className="product-description"
                          style={{
                            maxWidth: "200px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {product.description}
                        </div>
                      </td>
                      <td>{getCategoryNameById(product.category_id)}</td>
                      <td>
                        <button
                          onClick={() =>{ 
                            console.log("Navigating to:", `/admin/editproduct/${product.id}`); // Debugging
                            navigate(`/admin/editproduct/${product.id}`)
                          }}
                          className="btn btn-primary btn-sm mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No products available.
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
