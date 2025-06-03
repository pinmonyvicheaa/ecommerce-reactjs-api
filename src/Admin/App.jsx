import { useState } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";


import AddCategory from "./page/Addcategory";
import Addproduct from "./page/Addproduct";
import Viewproduct from "./page/Viewproduct";
import Editproduct from "./page/Editproduct";



import Dashboard from "./page/Dashboard";
import { ssrImportKey } from "vite/module-runner";

function App() {
 
  return (
    <>
    <div id="wrapper">
    
    <BrowserRouter>

    <Sidebar/>

    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <Topbar/>
          <Routes>
              <Route path="/dashboard" element={<Dashboard/>} ></Route>
              <Route path="/addcategory" element={<AddCategory/>} ></Route>
              <Route path="/addproduct" element={<Addproduct/>} ></Route>
              <Route path="/viewproduct" element={<Viewproduct/>} ></Route>
              <Route path="/editproduct" element={<Editproduct/>} ></Route>           
            </Routes>
          </div>
          <Footer/>
        </div>
    </BrowserRouter>

    </div>
    
      
    </>
  )
}

export default App
