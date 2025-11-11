import React from "react";
import { Link } from "react-router-dom";

const OrderListItem = ({ order }) => {
  const handleViewDetails = function (id) {
    // console.log(id);
  };

  return (
    <div className="mt-6 sm:mt-8">
      <div className="flex flex-wrap items-end justify-between gap-6 py-6 border-b-1 border-gray-600">
        <div className="">
          <div className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</div>
          <div className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
            <Link href="#" className="hover:underline">
              {order._id}
            </Link>
          </div>
        </div>

        <div>
          <div className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</div>
          <div className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{new Date(order.createdAt).toUTCString().slice(0, 16)}</div>
        </div>

        <div>
          <div className="text-base font-medium text-gray-500 dark:text-gray-400">Items:</div>
          <div className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{order.orderItems.length}</div>
        </div>

        <div>
          <div className="text-base font-medium text-gray-500 dark:text-gray-400">Price:</div>
          <div className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">₹{order.totalPrice}</div>
        </div>

        <div>
          <div className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</div>
          <div className="me-2 mt-1.5 inline-flex items-center rounded bg-blue-300 px-2.5 py-0.5 text-xs font-medium ">{order.orderStatus}</div>
        </div>

        <div>
          <Link
            to={`/order/${order._id}`}
            className="w-full rounded-lg border  border-blue-600 px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-gray-100  dark:text-gray-400 hover:bg-blue-700 hover:border-none dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderListItem;
