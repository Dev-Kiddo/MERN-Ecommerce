import React from "react";
import { useNavigate } from "react-router-dom";
import CheckOutPath from "./CheckOutPath";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "./PageTitle";
import { toast } from "react-toastify";
import { API } from "../config/api";

const ProcessPayment = () => {
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  // console.log(orderInfo);

  const { user } = useSelector((state) => state.user);
  const { shippinginfo } = useSelector((state) => state.cart);
  // console.log(shippinginfo);

  const handleBack = function () {
    navigate("/order/confirm");
  };

  const handlePayment = async function (amount) {
    try {
      // console.log(amount);

      const { data } = await axios(`${API}/getkey`);
      const { key } = data;
      // console.log(key);

      const { data: orderData } = await axios.post(`${API}/paymentprocess`, { amount: amount });

      // Open Razorpay Checkout
      const options = {
        key,
        amount: amount * 100,
        currency: "INR",
        name: "ShopIQ",
        description: "ShopIQ Test Transaction",
        order_id: orderData.order.id,
        // callback_url: " /api/v1/payment/verification",
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

          // Send to backend for verification
          const { data } = await axios.post(`${API}/payment/verification`, {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          });

          if (data.success) {
            toast.success("Order placed successfully");
            navigate(`/paymentsuccess?reference=${data.reference}`, { state: razorpay_order_id });

            // localStorage.removeItem("cartitems");
            // localStorage.removeItem("shippinginfo");
          } else {
            alert("Payment Verification Failed");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippinginfo.phoneNumber,
        },
        theme: {
          color: "#1447e6",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("handlePaymentErr:", error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <PageTitle title="Payment Process" />
      <div className="mb-12">
        <CheckOutPath currentStep={2} />
      </div>

      <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
        <button
          className="rounded-lg py-4 w-full  flex items-center justify-center gap-2 px-2 font-semibold text-lg leading-8 text-white bg-gray-500  transition-all duration-500 hover:bg-gray-600"
          onClick={handleBack}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 ">
            <path fill="white" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
          </svg>
          Go Back
        </button>

        <button
          className="rounded-lg w-full  py-4 text-center justify-center items-center bg-blue-700 font-semibold text-lg text-white flex gap-2 transition-all duration-500 hover:bg-blue-800"
          onClick={() => handlePayment(orderInfo.orderTotal)}
        >
          Pay ₹{orderInfo.orderTotal}
        </button>
      </div>
    </>
  );
};

export default ProcessPayment;
