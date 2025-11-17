import React from "react";
import PageTitle from "../components/PageTitle";
import CheckOutPath from "../components/CheckOutPath";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const { shippinginfo, cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  

  const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const deliveryCharges = subTotal > 1000 ? 0 : 50;

  const tax = subTotal * 0.18;

  const orderTotal = subTotal + tax + deliveryCharges;

  const handleProceedPayment = function (e) {
    e.preventDefault();

    const orderInfo = {
      subTotal,
      orderTotal,
      tax,
      deliveryCharges,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(orderInfo));

    navigate("/process/payment");
  };

  return (
    <>
      <PageTitle title="Order Confirmation" />
      <section className="mx-auto">
        <CheckOutPath currentStep={1} />

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
                </tr>
              </thead>

              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                    {user?.name}
                  </th>
                  <td className="px-6 py-4 capitalize">{`${shippinginfo.address}, ${shippinginfo.city}-${shippinginfo.pincode}, ${shippinginfo.state}, ${shippinginfo.country}`}</td>
                  <td className="px-6 py-4">{shippinginfo.email}</td>
                  <td className="px-6 py-4">{shippinginfo.phoneNumber}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Cart Details */}
        <div className="mb-6">
          <h2 className="text-lg mb-4 font-semibold text-gray-900 dark:text-white sm:text-xl">Cart Details</h2>

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
                    price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Price
                  </th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.productId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white capitalize">
                      <img className="w-15" src={item.image} alt={item.name} />
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">{item.name}</td>
                    <td className="px-6 py-4">₹{item.price}</td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">₹{item.price * item.quantity}</td>
                  </tr>
                ))}
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
                    Total Products
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sub Total
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Shipping Charges
                  </th>
                  <th scope="col" className="px-6 py-3">
                    GST
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Order Total
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                    {cartItems?.length}
                  </th>
                  <td className="px-6 py-4 capitalize">₹{subTotal}</td>
                  <td className="px-6 py-4">₹{deliveryCharges}</td>
                  <td className="px-6 py-4">₹{tax.toFixed(2)}</td>
                  <td className="px-6 py-4">₹{orderTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <button
          type="button"
          onClick={handleProceedPayment}
          className="text-white bg-blue-700 hover:bg-blue-800 mt-6 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Proceed to Payment
        </button>
      </section>
    </>
  );
};

export default OrderConfirmation;
