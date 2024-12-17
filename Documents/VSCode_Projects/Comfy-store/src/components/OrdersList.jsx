import React from "react";
import { useLoaderData } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const OrdersList = () => {
  const { orders } = useLoaderData();
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Costs</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order.id}>
                  <th>{order.attributes.name}</th>
                  <td>{order.attributes.address}</td>
                  <td>{order.attributes.numItemsInCart}</td>
                  <td>{order.attributes.orderTotal}</td>
                  <td>
                    {day(order.attributes.createdAt).format(
                      "hh:mm a - MMM Do, YYYY "
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrdersList;
