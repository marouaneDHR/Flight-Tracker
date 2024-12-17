import React from "react";
import CartTotals from "../components/CartTotals";
import CheckoutForm from "../components/CheckoutForm";
import { clearCart } from "../Features/cart/cartSlice";
import { customFetch } from "../utils";
import { redirect } from "react-router-dom";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    console.log(name, address);
    const user = JSON.parse(localStorage.getItem("user"));
    const { numItemsInCart, orderTotal, cartItems } =
      store.getState().cartState;
    const info = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: `$12200.99`,
      cartItems,
      numItemsInCart,
    };
    console.log(user.token);
    try {
      console.log("start");
      const response = await customFetch.post(
        "/orders",
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      store.dispatch(clearCart());
      return redirect("/orders");
    } catch (error) {
      console.log(error);
      return null;
    }
  };
const Checkout = () => {
  return (
    <div>
      <h2 className="fo nt-semibold text-3xl mb-2 border-b-2 pb-3">
        Your Orders
      </h2>
      <div className=" grid grid-cols-12 p-8 gap-20">
        <div className="col-span-6">
          <CheckoutForm />
        </div>
        <div className="col-span-6">
          <CartTotals />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
