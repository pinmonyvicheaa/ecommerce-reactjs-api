import React from "react"; 
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";

// Context Providers
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { CategoryProvider } from "./context/CategoryContext";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./Admin/components/Sidebar";
import Topbar from "./Admin/components/Topbar";
import FooterAdmin from "./Admin/components/Footer"
import ProtectedRoute from "./components/ProtectedRoute"; // Import Protected Route

// Pages (E-commerce)
import Home from "./page/Home/Home";
import About from "./page/About/About";
import Productlist from "./page/Productlist/Productlist";
import Productdetails from "./page/Productdetails/Productdetails";
import Contact from "./page/Contact";
import Cart from "./page/Cart";
import Checkout from "./page/Checkout";
import Confirmation from "./page/Confirmation";
import Login from "./page/Login";

// Pages (Admin)
import Dashboard from "./Admin/page/Dashboard";
import AddCategory from "./Admin/page/Addcategory";
import Addproduct from "./Admin/page/Addproduct";
import Viewproduct from "./Admin/page/Viewproduct";
import Editproduct from "./Admin/page/Editproduct";

function AppContent() {
  const location = useLocation();
  //const { user } = React.useContext(AuthContext);
  const isAdminPage = location.pathname.startsWith("/admin");

  if (isAdminPage) {
    return (
      <ProtectedRoute>
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar />
              <Routes>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/addcategory" element={<AddCategory />} />
                <Route path="/admin/addproduct" element={<Addproduct />} />
                <Route path="/admin/viewproduct" element={<Viewproduct />} />
                <Route path="/admin/editproduct/:id" element={<Editproduct />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" />} />
              </Routes>
            </div>
            <FooterAdmin/>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/productlist" element={<Productlist />} />
        <Route path="/productdetails" element={<Productdetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/login" element={<Login />} />
        {/* Protect E-commerce dashboard */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CategoryProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </CategoryProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
