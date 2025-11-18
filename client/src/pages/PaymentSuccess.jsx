import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import CheckOutPath from "../components/CheckOutPath";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, removeError, removeSuccess } from "../features/order/orderSlice";
import { toast } from "react-toastify";
import { clearCartItems } from "../features/cart/cartSlice";

const PaymentSuccess = () => {
  const location = useLocation();

  const orderId = location?.state;

  const search = new URLSearchParams(location.search).get("reference");

  const { shippinginfo, cartItems } = useSelector((state) => state.cart);

  const { success, error } = useSelector((state) => state.order);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();

  const effectRun = useRef(false);

  const orderData = {
    shippingInfo: {
      address: shippinginfo?.address,
      city: shippinginfo?.city,
      state: shippinginfo?.state,
      country: shippinginfo?.country,
      pinCode: shippinginfo?.pincode,
      phoneNo: shippinginfo?.phoneNumber,
    },
    orderItems: cartItems.map((item) => {
      return {
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        product: item.productId,
      };
    }),

    paymentInfo: {
      id: search,
      status: "successed",
    },
    itemPrice: orderInfo?.subTotal,
    taxPrice: orderInfo?.tax,
    shippingPrice: orderInfo?.deliveryCharges,
    totalPrice: orderInfo?.orderTotal,
  };

  useEffect(function () {
    if (effectRun.current === false) {
      dispatch(createOrder({ orderData }));
      sessionStorage.removeItem("orderInfo");
    }

    return () => (effectRun.current = true);
  }, []);

  useEffect(
    function () {
      if (success) {
        dispatch(removeSuccess());
        dispatch(clearCartItems());
      }
    },
    [dispatch, success]
  );

  useEffect(
    function () {
      if (error) {
        toast(error);
        dispatch(removeError());
      }
    },
    [dispatch, error]
  );

  return (
    <>
      <CheckOutPath currentStep={3} />
      {/* <hr className="my-10  dark:border-gray-600" /> */}

      <div className="text-center mx-auto">
        <div className="w-16 h-16 mx-auto flex justify-center items-center bg-green-700 rounded-full mb-2">
          <svg className="w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="#84e1bc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"></path>
          </svg>
        </div>
        <h2 className="text-white font-bold text-lg mb-2"> Your order is confirmed!</h2>
        <p className="text-gray-400">{`Your ${orderId} will be processed within 24 hours during working days. We will notify you by email once your order has been shipped.`}</p>

        <hr className="my-6  dark:border-gray-600" />

        <div className="flex justify-between items-center">
          <Link
            className="text-white bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:px-4 md:text-sm"
            to="/myorders"
          >
            View Order Details
          </Link>

          <Link
            className="text-white bottom-2.5 bg-gray-600 hover:bg-gray-700 focus:ring-2 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-2  dark:focus:ring-gray-200 sm:px-4 md:text-sm"
            to="/products"
          >
            Return to shopping
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
