import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function CategoryDashboard() {
  const { categories, fetchCategories, createCategory, updateCategory } = useContext(CategoryContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize navigate

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [editingCategory, setEditingCategory] = useState(null); // Track category being edited

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || user.role !== "admin") {
      alert("Unauthorized: Only admins can manage categories.");
      return;
    }

    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
    } else {
      createCategory(formData);
    }

    // Reset form and clear editing state
    setFormData({ name: "", description: "" });
    setEditingCategory(null);
  };

  const handleEdit = (category) => {
    setFormData({ name: category.name, description: category.description });
    setEditingCategory(category);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h2>Category Management</h2>
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

      {user?.role === "admin" && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-control"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            {editingCategory ? "Update Category" : "Create Category"}
          </button>
        </form>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            {user?.role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              {user?.role === "admin" && (
                <td>
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(category)}>
                    Edit
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
