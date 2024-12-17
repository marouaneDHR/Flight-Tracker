import React from "react";
import { useSelector } from "react-redux";

const CartTotals = () => {
  const { tax, shipping, cartTotal, orderTotal } = useSelector(
    (state) => state.cartState
  );
  return (
    <div>
      <div className="card p-8 bg-base-200 rounded-xl">
        <p className="flex justify-between text-xs mb-2 border-b-2 pb-3">
          Subtotal{" "}
          <span className="text-xs font-semibold">${cartTotal.toFixed(2)}</span>
        </p>
        <p className="flex justify-between text-xs mb-2 border-b-2 pb-2">
          Tax <span className="text-xs  font-semibold">${tax.toFixed(2)}</span>
        </p>
        <p className="flex justify-between text-xs mb-2 border-b-2 pb-2">
          Shipping <span className="text-xs font-semibold">${shipping}</span>
        </p>
        <p className="flex justify-between mt-6 text-sm ">
          Order Total{" "}
          <span className="text-sm font-semibold">
            ${orderTotal.toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CartTotals;
