import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after login
import { AuthContext } from "../context/AuthContext"; // Import your AuthContext

export default function Login() {
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [error, setError] = useState(""); // Error state to store login errors
  const { login } = useContext(AuthContext); // Destructure login function from context
  const navigate = useNavigate(); // For page navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Wait for the login function to complete
      const user = await login(email, password); 
  
      if (user) {
        // Retrieve role from the user or localStorage and navigate accordingly
        const userRole = user.role || localStorage.getItem("role");
        
        // Navigate based on the role
        if (userRole === "admin") {
          navigate("/admin/dashboard"); // Redirect to admin dashboard
        } else {
          navigate("/"); // Redirect to customer home page
        }
      } else {
        // If no user or login fails, show an error
        setError("Invalid email or password! Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Email or Password is wrong! Please enter the correct Email or Password.");
    }
  };
  
  

  return (
    <div>
      {/* breadcrumb part start */}
      <section className="breadcrumb_part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb_iner">
                <h2>Login</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* breadcrumb part end */}

      {/*================login_part Area =================*/}
      <section className="login_part section_padding ">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
              <div className="login_part_text text-center">
                <div className="login_part_text_iner">
                  <h2>New to our Shop?</h2>
                  <p>There are advances being made in science and technology every day, and a good example of this is the</p>
                  <a href="#" className="btn_3">
                    Create an Account
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="login_part_form">
                <div className="login_part_form_iner">
                  <h3>Welcome Back ! <br /> Please Sign in now</h3>
                  
                  {/* Show error message if login fails */}
                  {error && (
                    <div className="alert alert-danger">
                      <strong>{error}</strong>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="row contact_form" noValidate="novalidate">
                    <div className="col-md-12 form-group p_star">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state
                        placeholder="Email"
                      />
                    </div>
                    <div className="col-md-12 form-group p_star">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state
                        placeholder="Password"
                      />
                    </div>
                    <div className="col-md-12 form-group">
                      <div className="creat_account d-flex align-items-center">
                        <input type="checkbox" id="f-option" name="selector" />
                        <label htmlFor="f-option">Remember me</label>
                      </div>
                      <button type="submit" className="btn_3">
                        Log in
                      </button>
                      <a className="lost_pass" href="#">
                        Forgot password?
                      </a>
                    </div>
                  </form>
                  {error && <p className="error-message">{error}</p>} {/* Display error if any */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*================login_part end =================*/}
    </div>
  );
}
