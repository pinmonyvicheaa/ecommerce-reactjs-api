import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import { useCategory } from "../../context/CategoryContext"; // Import CategoryContext

export default function Editproduct() {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate();
    const { products, updateProduct } = useProduct();
    const { categories, loading, error, fetchCategories } = useCategory(); // Get categories from CategoryContext

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

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        stock: "",
        description: "",
        category: "",
        image_url: null,
    });

    useEffect(() => {
        const product = products.find((p) => p.id === parseInt(id));
        if (product) {
            setFormData({
                name: product.name,
                price: product.price,
                stock: product.stock,
                description: product.description,
                category: product.category_id,
                image_url: null, // image_url is not set here; it's optional to update
            });
        }
    }, [id, products]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === "file") {
        if (files.length > 0) {
            setFormData({
                ...formData,
                image_url: files[0], // Ensure image_url is a valid File object
            });
        } else {
            setFormData({ ...formData, image_url: null }); // Reset image_url if no file is selected
        }
    } else {
        setFormData({
            ...formData,
            [name]: value,
        });
    }
};



const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("price", formData.price);
    updatedData.append("stock", formData.stock);
    updatedData.append("description", formData.description);
    updatedData.append("category_id", formData.category.toString());

    // Ensure image_url is correctly added to FormData
    if (formData.image_url instanceof File) {
        updatedData.append("image_url", formData.image_url);
    } else {
        console.warn("No valid image_url selected or image_url is not a File.");
    }

    // Debugging: Check FormData values
    for (let [key, value] of updatedData.entries()) {
        console.log(`${key}:`, value);
        if (key === "image_url" && !(value instanceof File)) {
            console.error("❌ image_url is not a valid File object!");
        }
    }

    try {
        await updateProduct(id, updatedData);
        navigate("/admin/viewproduct");
    } catch (error) {
        console.error("Error updating product:", error.response?.data || error.message);
    }
};


    return (
        <div className="container mt-5">
            <h2 className="text-center">Edit Product</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label>Product Name:</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Product Price:</label>
                    <input
                        type="text"
                        name="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Product Quantity:</label>
                    <input
                        type="number"
                        name="stock"
                        className="form-control"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Product Description:</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category:</label>
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
                <div className="form-group">
                    <label>Product image_url:</label>
                    <input type="file" name="image_url_url" className="form-control-file"  accept="image_url_url/*" onChange={handleChange} />
                </div>

                {products.find((p) => p.id === parseInt(id))?.image_url_url && (
                    <div className="mb-3">
                        <img
                            src={products.find((p) => p.id === parseInt(id))?.image_url_url}
                            alt="Product"
                            style={{ width: "150px", height: "auto" }}
                        />
                    </div>
                )}

                <button type="submit" className="btn btn-primary mr-1">
                    Update
                </button>
                <button onClick={() => navigate("/admin/viewproduct")} className="btn btn-secondary">
                    Cancel
                </button>
            </form>
        </div>
    );
}
