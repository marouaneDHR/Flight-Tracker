import React from "react";
import { generateAmountOptions } from "../utils/index.jsx";
import { useDispatch } from "react-redux";
import { editItem, removeItem } from "../Features/cart/cartSlice.js";
import {login} from '../Features/user/userSlice.js'
const CartItem = ({
  productId,
  title,
  image,
  company,
  productColor,
  amount,
  price,
}) => {
  const dispatch = useDispatch();
  return (
    <article
      className="flex flex-row justify-between flex-wrap pb-6 border-base-300"
      key={productId}
    >
      <img
        src={image}
        alt={title}
        className="w-36 h-36 object-cover rounded-box"
      />
      <div>
        <h3 className="font-medium capitalize mb-2">{title}</h3>
        <p className="capitalize text-sm text-neutral-content">{company}</p>
        <p className="mt-4 flex items-center gap-x-2 text-sm">
          Color :
          <span
            className="badge badge-sm"
            style={{ backgroundColor: productColor }}
          ></span>
        </p>
      </div>
      <div className="form-control">
        <label htmlFor="amount" className="label-text">
          Amount
        </label>
        <select
          name="amount"
          className="select select-xs mt-2 rounded-box"
          onChange={(e) => {
            const newAmount = parseInt(e.target.value);
            dispatch(editItem({ productId, amount: newAmount }));

          }}
          defaultValue={amount}
        >
          {generateAmountOptions(amount + 5)}
        </select>
        <button
          className="mt-3 text-primary text-sm"
          onClick={() => dispatch(removeItem(productId))}

        >
          remove
        </button>
      </div>
      <div className="font-semibold text-secondary">${price}</div>
    </article>
  );
};

export default CartItem;
