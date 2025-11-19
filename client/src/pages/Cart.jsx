import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import PageTitle from "../components/PageTitle";
import EmptyCart from "../components/EmptyCart";
import { useSelector } from "react-redux";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const tax = subTotal * 0.14;

  const deliveryCharges = subTotal > 1000 ? 0 : 50;

  const total = Math.round(subTotal + tax + deliveryCharges);

  const handleProceedCheckout = function () {
    navigate(`/login?redirect=/shipping`);
  };

  return (
    <>
      <PageTitle title="Shopping Cart" />
      {cartItems.length > 0 ? (
        <section className="bg-white py-8 antialiased dark:bg-gray-800 md:py-16">
          <div className="mx-auto 2xl:px-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Your Cart</h2>

            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                {cartItems.map((cartItem) => (
                  <CartItem key={cartItem.productId} cartItem={cartItem} />
                ))}
              </div>

              {/* Order Summary */}
              <div className="mx-auto mt-6 flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">₹{subTotal}</dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                        <dd className="text-base font-medium text-green-600">₹0</dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Shipping / Delivery Charges</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">₹{deliveryCharges}</dd>
                      </dl>

                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">₹{tax.toFixed(2)}</dd>
                      </dl>
                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">₹{total.toFixed(2)}</dd>
                    </dl>
                  </div>

                  <button
                    className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white  focus:outline-none focus:ring-2 dark:hover:bg-blue-800"
                    onClick={handleProceedCheckout}
                  >
                    Proceed to Checkout
                  </button>

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>

                    <Link to="/products" className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 underline hover:no-underline">
                      Continue Shopping &#8594;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default Cart;
