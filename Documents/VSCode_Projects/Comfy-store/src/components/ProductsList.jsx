import React from "react";
import { useLoaderData, Link } from "react-router-dom";

const ProductsList = () => {
  const { products } = useLoaderData();
  return (
    <div className="w-full mt-12 ">
      {products.map((product) => {
        const { title, image, price, company } = product.attributes;
        return (
          <Link
            to={`/products/${product.id}`}
            className="rounded-box p-8 shadow-xl flex flex-col flex-wrap sm:flex-row hover:shadow-2xl transition duration-300 justify-between mb-4"
            key={product.id}
          >
            <img
              src={image}
              alt={title}
              className="w-52 h-52 rounded-box object-cover"
            />
            <div className="m-0 justify-start">
              <h1 className="font-bold text-3xl capitalize">{title}</h1>
              <h4 className="font-semibold text-xl mt-2">{company}</h4>
            </div>

            <p className=" font-semibold text-secondary">${price}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsList;
