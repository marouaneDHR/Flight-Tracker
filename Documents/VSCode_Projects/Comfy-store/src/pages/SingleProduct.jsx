import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { customFetch } from "../utils";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../Features/cart/cartSlice";

export const loader = async ({ params }) => {
  let resp = await axios(`http://localhost:8000/api/products/${params.id}`);

  //let resp = await customFetch(`/products/${params.id}`);

  console.log(resp.data.data[0].attributes);
  resp.data.data[0].attributes.price /= 100;
  console.log(resp.data.data[0].attributes.price);
  return resp.data.data[0];
};
const SingleProduct = () => {
  const product = useLoaderData();
  const dispatch = useDispatch();
  const { title, image, description, price, colors, company } =
    product.attributes;

  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const cartProduct = {
    productId: product.id,
    title,
    image,
    price,
    productColor,
    company,
    amount,
  };

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  return (
    <section>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link to={"/"} className="capitalize">
              home
            </Link>
          </li>
          <li>
            <Link to={"/products"} className="capitalize">
              products
            </Link>
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-2 md:gap-2 sm:gap-1 mt-10">
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-box "
        />
        <div>
          <h1 className="text-3xl font-bold capitalize">{title}</h1>
          <h4 className="mt-2 text-xl font-semibold ">{company}</h4>
          <p className="text-secondary mt-1 text-lg leading-8 ">${price}</p>
          <p className="mt-1 leading-7 w-11/12">{description}</p>
          <div className="mt-4">
            <p className=" font-semibold capitalize">colors</p>
            {colors.map((color) => {
              return (
                <button
                  key={color}
                  type="button"
                  className={`w-6 h-6 mr-1 badge ${
                    color === productColor && "border-2 border-secondary"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setProductColor(color)}
                ></button>
              );
            })}
          </div>
          <div className="mt-4">
            <p className="font-semibold capitalize">amount</p>
            <select
              name="product-amount"
              className="select select-bordered select-primary w-32 mt-2"
              value={amount}
              onChange={handleAmount}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div className="mt-8">
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch(addToCart(cartProduct));
              }}
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
