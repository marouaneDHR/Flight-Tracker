import React from "react";
import { Link } from "react-router-dom";
import { CartItemsList } from "../components";
import CartTotals from "../components/CartTotals";
import { useSelector } from "react-redux";

const Cart = () => {
  const user = useSelector((state) => state.userState.user);
  const { numItemsInCart } = useSelector((state) => state.cartState);
  if (numItemsInCart < 1) {
    return (
      <div>
        <h2 className="font-semibold text-3xl flex flex-col items-center mt-32">
          Your Cart Is Empty
        </h2>
      </div>
    );
  }
  return (
    <div>
      <h2 className="font-semibold text-3xl mb-2 border-b-2 pb-3">
        Shopping Cart
      </h2>
      <div className=" grid grid-cols-12 p-8 gap-20">
        <div className="col-span-8">
          <CartItemsList />
        </div>
        <div className="col-span-4">
          <CartTotals />
          {!user && (
            <Link
              to={"/login"}
              className="btn btn-primary flex items-center w-full mt-6 "
            >
              LOGIN TO CHECKOUT
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
