import React, { useState, useContext } from "react";
import { CategoryContext } from "/src/context/CategoryContext";

export default function AddCategory() {
    
  const { createCategory, loading, error } = useContext(CategoryContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCategory(formData); // Call createCategory from context
    setFormData({ name: "", description: "" }); // Reset form after submission
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h4 className="text-center">Add Category</h4>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="name">Category Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Category Name"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="description">Description</label>
                <textarea
                  rows="3"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter Description"
                  className="form-control"
                  required
                ></textarea>
              </div>
              <div className="col-md-12 mt-3 text-center">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
