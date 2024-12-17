import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const ProductsGrid = () => {
  const { products } = useLoaderData();

  return (
    <div className="w-full grid gap-3 md:grid-cols-2 lg:grid-cols-3 mt-12">
      {products.map((product) => {
        const { image, title, price } = product.attributes;
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="card hover:shadow-2xl w-full"
          >
            <img
              src={image}
              alt={title}
              className=" px-3 pt-4 w-full h-60 object-cover "
            />
            <div className="card-body items-center text-center pt-2">
              <h2 className="card-title tracking-wider capitalize ">{title}</h2>
              <p className="text-secondary font-bold">${price}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
