import React from "react";
import { customFetch } from "../utils";
import { useLoaderData } from "react-router-dom";
import OrdersList from "../components/OrdersList";
import ComplexPaginationContainer from "../components/ComplexPaginationContainer";

export const loader =
  (store) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const user = store.getState().userState.user;
    try {
      const resp = await customFetch("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return { orders: resp.data.data, meta: resp.data.meta };
    } catch (error) {
      console.log(error);
      return null;
    }
  };
const Orders = () => {
  const { meta } = useLoaderData();
  return (
    <div>
      <h2 className="fo nt-semibold text-3xl mb-2 border-b-2 pb-3">
        Your Orders
      </h2>

      <p className="capitalize mt-3">
        total orders : <span>{meta.pagination.total}</span>
      </p>
      <OrdersList />
      <ComplexPaginationContainer />
    </div>
  );
};

export default Orders;
