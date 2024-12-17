import React from "react";
import axios from "axios";
import { customFetch } from "../utils";
import { Filters, ProductsContainer, ProductsPagination } from "../components";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const resp = await axios.get("http://localhost:8000/api/products", {
    params,
  });
  // const resp = await customFetch("/products", {
  //   params,
  // });
  console.log(resp);
  const products = resp.data.data;
  products.forEach((product) => {
    product.attributes.price /= 100;
  });
  const meta = resp.data.meta;
  return { products, meta, params };
};

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <ProductsPagination />
    </>
  );
};

export default Products;
