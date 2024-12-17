import React from "react";
import { Hero } from "../components";
import axios from "axios";
import FeaturedProducts from "../components/FeaturedProducts";

//const url = "/products?featured=true";
export const loader = async () => {
  try {
    const resp = await axios.get(
      "http://localhost:8000/api/products?featured=true"
    );
    const products = resp.data.data;
    return { products };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
