import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeCartError, removeCartSuccess, removeItemFromCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

const CartItem = ({ cartItem }) => {
  console.log(cartItem);
  const dispatch = useDispatch();
  const { loading, error, success, message, cartItems } = useSelector((state) => state.cart);

  const [quantity, setQuantity] = useState(cartItem.quantity);

  const handleQuantity = function (e) {
    if (e.target.id === "decrement-button") {
      setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    }
    if (e.target.id === "increment-button") {
      setQuantity((prev) => (prev < cartItem.stock ? prev + 1 : prev));
    }
  };

  const handleUpdateQuantity = function (e) {
    e.preventDefault();
    console.log("clicked");
    console.log(cartItem.quantity, quantity);

    if (cartItem.quantity !== quantity) {
      console.log("updating...");
      console.log({ id: cartItem.productId, quantity });

      dispatch(addItemsToCart({ productId: cartItem.productId, quantity }));
    }
  };

  const handleDeleteCartItem = function (productId) {
    // console.log("clicked");
    dispatch(removeItemFromCart(productId));
    toast.success("Item removed from cart successfully");
  };

  useEffect(
    function () {
      if (success) {
        toast.success(message, { toastId: "cart-update" });
        dispatch(removeCartSuccess());
      }
    },
    [dispatch, message, success]
  );

  useEffect(
    function () {
      if (error) {
        toast.error(error);
        dispatch(removeCartError());
      }
    },
    [error, dispatch]
  );
  return (
    <div>
      <div className="rounded-lg border mb-4 lg:mb-2 border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
        <div className="md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
          <div className="flex items-center gap-4">
            <Link to="#" className="shrink-0">
              <img className="hidden h-20 w-20 rounded-lg dark:block" src="/images/productph.png" alt="imac image" />
            </Link>

            <div className="w-full min-w-0 flex-1 space-y-4  md:hidden">
              <Link href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                {cartItem.name}
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between flex-1 gap-2 md:gap-4 mt-2 md:mt-0  md:justify-end">
            <div className="w-full min-w-0 flex-1 space-y-4 hidden md:inline-flex md:max-w-md">
              <Link href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                {cartItem.name}
              </Link>
            </div>

            <div className="w-16 md:w-22">
              <p className="text-sm text-center font-light text-gray-900 dark:text-green-500">{cartItem.stock}</p>
            </div>

            <div className="w-16 md:w-22">
              <p className="text-sm font-light text-gray-900 dark:text-white">₹{cartItem.price} (1x)</p>
            </div>

            <div className="flex items-center">
              <button
                type="button"
                disabled={loading}
                id="decrement-button"
                className="inline-flex text-white h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                onClick={handleQuantity}
              >
                -
              </button>
              <input
                type="text"
                id="counter-input"
                className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                value={quantity}
                readOnly
              />
              <button
                type="button"
                id="increment-button"
                disabled={loading}
                className="inline-flex text-white h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                onClick={handleQuantity}
              >
                +
              </button>
            </div>

            <div className="text-end w-16 md:w-22">
              <p className="text-base font-bold text-gray-900 dark:text-white">₹{cartItem.price * quantity}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-4 mt-4">
          <button type="button" className="text-sm font-medium text-red-600 hover:underline dark:text-red-500" onClick={() => handleDeleteCartItem(cartItem.productId)}>
            &times; Remove
          </button>

          {cartItem.quantity !== quantity && (
            <button
              disabled={loading || cartItem.quantity === quantity}
              type="button"
              className="self-end text-sm font-medium text-red-600 hover:underline dark:text-blue-500"
              onClick={handleUpdateQuantity}
            >
              {loading ? "Quantity Updating..." : "Update Quantity"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
