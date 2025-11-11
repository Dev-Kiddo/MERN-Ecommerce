import React, { useEffect } from "react";
import OrderListItem from "../components/OrderListItem";

import { useSelector, useDispatch } from "react-redux";
import { getAllUserOrders, removeError } from "../features/order/orderSlice";
import PageTitle from "../components/PageTitle";
import NoOrderFound from "../components/NoOrderFound";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  //   console.log(orders);

  useEffect(
    function () {
      dispatch(getAllUserOrders());
    },
    [dispatch]
  );

  useEffect(
    function () {
      if (error) {
        toast.error(error);
        dispatch(removeError());
      }
    },
    [error, dispatch]
  );
  return (
    <>
      <PageTitle title="My Orders" />
      <section className="py-8 antialiased">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <div className="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">My orders</h2>
            </div>

            {loading && <Loader />}

            {orders.length > 0 ? orders.map((order) => <OrderListItem order={order} key={order._id} />) : <NoOrderFound />}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyOrders;
