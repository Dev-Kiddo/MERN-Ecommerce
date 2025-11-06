import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { forgotPassword, removeSuccess } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState("");
  const navigate = useNavigate();

  const { message, success, loading, error } = useSelector((state) => state.user);

  const handleSubmit = function (e) {
    const payload = {
      email: formData,
    };
    e.preventDefault();
    dispatch(forgotPassword({ payload }));
    navigate("/reset/223");
  };

  useEffect(
    function () {
      if (success) {
        toast.success(message);
        dispatch(removeSuccess());
      }
    },
    [success, message, dispatch]
  );

  useEffect(
    function () {
      if (error) {
        toast(error);
      }
    },
    [error]
  );

  return (
    <>
      <h3 className="text-center text-3xl text-white font-bold mb-8 uppercase">Forgot Password</h3>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your registered email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="mail@gmail.com"
            required
            value={formData}
            onChange={(e) => setFormData(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-2 sm:w-auto"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default ForgotPassword;
