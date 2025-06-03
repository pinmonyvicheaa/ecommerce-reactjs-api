import React from "react";

import Feature from "../../components/Feature";
import Client_review from "../../components/Client_review";
import Subscribe from "../../components/Subscribe";
import Productlist_section from "./Productlist_section";

 // Ensure PascalCase for file names

const Productlist = () => {
  return (
    <>
      <Productlist_section/>
      <Client_review/>
      <Feature/>
      <Subscribe/>
      
    </>
  );
};

export default Productlist;