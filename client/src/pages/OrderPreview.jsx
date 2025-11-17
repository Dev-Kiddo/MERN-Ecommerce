import React, { useEffect } from "react";
import PageTitle from "../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../features/order/orderSlice";
import { useParams } from "react-router-dom";

const OrderPreview = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { order } = useSelector((state) => state.order);
  // console.log(order);

  useEffect(
    function () {
      dispatch(getOrderDetails({ orderId: id }));
    },
    [dispatch, id]
  );
  return (
    <>
      <PageTitle title="Order Preview" />
      <section className="mx-auto">
        {/* Order Details */}
        <div className="mb-6">
          <h2 className="text-lg mb-4 font-semibold text-gray-900 dark:text-white sm:text-xl">Order Details</h2>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                </tr>
              </thead>

              <tbody>
                {order?.orderItems?.map((item) => (
                  <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white capitalize">
                      <img className="w-15" src={item.image} alt={item.name} />
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">{item.name}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">₹{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="mb-6">
          <h2 className="text-lg mb-4 font-semibold text-gray-900 dark:text-white sm:text-xl">Shipping Details</h2>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Shipping Charges
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                    {order?.user?.name}
                  </th>
                  <td className="px-6 py-4 capitalize">{order?.shippingInfo?.address}</td>
                  <td className="px-6 py-4">{order?.user?.email}</td>
                  <td className="px-6 py-4">{order?.shippingInfo?.phoneNo}</td>
                  <td className="px-6 py-4">₹{order.shippingPrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary Details */}
        <div className="mb-6">
          <h2 className="text-lg mb-4 font-semibold text-gray-900 dark:text-white sm:text-xl">Order Summary</h2>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Ordet Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Paid At
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tax
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Total Price
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                    <span className="me-2 mt-1.5 inline-flex items-center rounded bg-blue-300 text-gray-800 px-2.5 py-0.5 text-xs font-medium ">{order.orderStatus}</span>
                  </th>
                  <td className="px-6 py-4 capitalize">
                    <span className="me-2 mt-1.5 inline-flex items-center rounded bg-green-300 text-gray-800 px-2.5 py-0.5 text-xs font-medium ">{order.paymentInfo?.status}</span>
                  </td>
                  <td className="px-6 py-4">{new Date(order.paidAt).toUTCString().slice(0, -7)}</td>

                  <td className="px-6 py-4">₹{order.taxPrice}</td>
                  <td className="px-6 py-4">₹{order.totalPrice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderPreview;
