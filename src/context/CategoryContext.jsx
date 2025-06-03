import { createContext, useReducer, useEffect, useContext, useRef } from "react"; 
import api from "../services/api";
import { AuthContext } from "./AuthContext"; // Import Auth Context

export const CategoryContext = createContext();

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload, error: null };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { token, user } = useContext(AuthContext); // Get Token & User Role from AuthContext
  const fetchedOnce = useRef(false); // Track if categories have already been fetched

  // Fetch all categories
  const fetchCategories = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await api.get("/categories", {
        headers: { Authorization: `Bearer ${token}` }, // Include Token
      });
      dispatch({ type: "SET_CATEGORIES", payload: response.data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.response?.data.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Create Category (Admin Only)
  const createCategory = async (categoryData) => {
    if (!user || user.role !== "admin") {
      alert("Unauthorized: Only admins can create categories.");
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await api.post("/categories", categoryData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include Token
        },
      });

      fetchCategories(); // Refresh categories after creation
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.response?.data.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Update Category (Admin Only)
  const updateCategory = async (id, categoryData) => {
    if (!user || user.role !== "admin") {
      alert("Unauthorized: Only admins can update categories.");
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await api.put(`/categories/${id}`, categoryData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include Token
        },
      });

      fetchCategories(); // Refresh categories after update
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.response?.data.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Use useEffect to fetch categories once, and avoid repeated fetching
  useEffect(() => {
    // Only fetch categories once (if not already fetched)
    if (!fetchedOnce.current) {
      fetchCategories();
      fetchedOnce.current = true; // Mark as fetched
    }
  }, [token]); // Only re-run when `token` changes, but will not keep re-fetching due to `fetchedOnce`

  return (
    <CategoryContext.Provider value={{ 
      ...state, fetchCategories, createCategory, updateCategory 
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Export the `useCategory` hook
export const useCategory = () => useContext(CategoryContext);
