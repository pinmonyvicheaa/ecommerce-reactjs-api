import { createContext, useReducer, useEffect } from "react";
import api, { setAuthToken } from "../services/api";

export const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Check localStorage for user data
  token: localStorage.getItem("token") || "",
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_TOKEN":
      setAuthToken(action.payload);
      return { ...state, token: action.payload };
    case "LOGOUT":
      setAuthToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return { ...initialState, token: "" };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Sync user and token to localStorage whenever they change
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    }
    if (state.token) {
      localStorage.setItem("token", state.token);
    }
  }, [state.user, state.token]);

  const login = async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });
      console.log("Login response:", response.data); // Log the response to verify
  
      dispatch({ type: "SET_TOKEN", payload: response.data.token });
      dispatch({ type: "SET_USER", payload: response.data.user });

      setAuthToken(response.data.token); // ✅ Set token globally
  
      localStorage.setItem("role", response.data.user.role); // Store role for navigation
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data

      return response.data.user; // Ensure you return user data to handle after login
    } catch (error) {
      console.error("Login error:", error);
      dispatch({ type: "SET_ERROR", payload: error.response?.data.message || "An error occurred during login" });
      throw error; // Ensure error is thrown for catching in handleSubmit
    }
  };
  
  

  const register = async (name, email, password) => {
    try {
      await api.post("/register", { name, email, password });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.response?.data.message });
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
  
      if (!token) {
        // If no token found, consider the user already logged out
        console.log("No token found, user already logged out.");
        dispatch({ type: "LOGOUT" }); // Update global state to logged out
        window.location.href = "/login"; // Redirect to login page
        return; // Exit the function early
      }
  
      // Perform the logout API call if token exists
      await api.post("/logout", null, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Clear user data from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
  
      // Dispatch logout action to update global state
      dispatch({ type: "LOGOUT" });
  
      // Redirect to login page after successful logout
      window.location.href = "/login"; 
  
    } catch (error) {
      // Handle errors that occur during logout
      console.error("Logout error:", error);
      dispatch({ type: "SET_ERROR", payload: error.response?.data?.message || "Logout failed" });
    }
  };
  
  

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
