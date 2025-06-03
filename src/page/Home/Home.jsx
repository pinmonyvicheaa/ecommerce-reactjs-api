import React from "react";
import Banner from "./Banner";
import Product from "./product";
import Client_review from "../../components/Client_review";
import Feature from "../../components/Feature";
import Subscribe from "../../components/Subscribe";

 // Ensure PascalCase for file names

const Home = () => {
  return (
    <>
      <Banner />
      <Product/>
      <Client_review/>
      <Feature/>
      <Subscribe/>
      
    </>
  );
};

export default Home;