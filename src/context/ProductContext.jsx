import { createContext, useContext, useReducer, useEffect } from "react";
import api from "../services/api"; // Import API service
import { AuthContext } from "./AuthContext"; // Import AuthContext to check user role

export const ProductContext = createContext();

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    default:
      return state;
  }
};


export const ProductProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext); // Get user & token
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch all products
  const fetchProducts = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await api.get("/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "SET_PRODUCTS", payload: response.data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.response?.data || error.message });
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

  // Create a new product (Admin only)
  const createProduct = async (formData) => {
    if (!user || user.role !== "admin") {
      console.error("Unauthorized: Only admins can create products.");
      return;
    }

    try {
      const response = await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "ADD_PRODUCT", payload: response.data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.response?.data || error.message });
    }
  };

  // Update an existing product (Admin only)
  const updateProduct = async (id, formData) => {
    try {
      const response = await api.post(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Product updated successfully:", response.data);
      dispatch({ type: "UPDATE_PRODUCT", payload: response.data });
       // Return the response for possible chaining
    return response.data;
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error.message);
    }
  };
  

  // Delete a product (Admin only)
  const deleteProduct = async (id) => {
    if (!user || user.role !== "admin") {
      console.error("Unauthorized: Only admins can delete products.");
      return;
    }

    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "DELETE_PRODUCT", payload: id });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.response?.data || error.message });
    }
  };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use ProductContext
export const useProduct = () => {
  return useContext(ProductContext);
};
