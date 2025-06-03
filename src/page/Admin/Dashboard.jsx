import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const { products, fetchProducts, createProduct, updateProduct, deleteProduct } = useProduct();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null,
    category_id: "",
  });

  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchProducts(); // Fetch products when admin logs in
    }
  }, [user, navigate]);



  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || user.role !== "admin") {
      alert("Unauthorized: Only admins can manage categories.");
      return;
    }
  
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
  
    if (editingProduct) {
      // Update the product
      await updateProduct(editingProduct.id, data);
    } else {
      // Create a new product
      await createProduct(data);
    }
  
    // Clear form and reset the editing state
    setEditingProduct(null);
    setFormData({ name: "", description: "", price: "", stock: "", image: null, category_id: "" });
  
    // Fetch updated products to reflect the new data
    fetchProducts();
  };
  

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: null, // Image remains the same if not changed
      category_id: product.category_id,
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  return (
    <div className="dashboard">
      <section className="breadcrumb_part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb_iner">
                <h2>Dashboard</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard_section section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="dashboard_info">
                <h3>Welcome, {user?.name}</h3>
                <p>Email: {user?.email}</p>
                <p>Role: {user?.role}</p>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Only Admins Can See This */}
          {user?.role === "admin" && (
            <>
              <h2 className="mt-4">Manage Products</h2>

              {/* Product Form */}
              <form onSubmit={handleSubmit} className="mb-4">
                <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
                <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />
                <input type="file" name="image" onChange={handleChange} />
                <input type="number" name="category_id" placeholder="Category ID" value={formData.category_id} onChange={handleChange} required />
                <button type="submit" className="btn btn-success">
                  {editingProduct ? "Update Product" : "Create Product"}
                </button>
              </form>

              {/* Product List */}
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.stock}</td>
                      <td>
                        {console.log("Image URL:", product.image_url)}
                        {product.image_url && (
                          <img src={product.image_url} alt={product.name} width="50" />
                        )}
                      </td>
                      <td>
                        <button className="btn btn-primary" onClick={() => handleEdit(product)}>
                          Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => deleteProduct(product.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
