import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import { removeSuccess, resetPassword } from "../features/user/userSlice";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log("params:", params);

  const { success, error, message } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = function (e) {
    const { id, value } = e.target;

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    const payload = {
      data: formData,
      token: params.token,
    };

    dispatch(resetPassword(payload));
    navigate("/login");
  };

  useEffect(
    function () {
      if (success) {
        toast(message);
        dispatch(removeSuccess());
        // console.log("success removed");
      }
    },
    [dispatch, message, success]
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
      <PageTitle title="Reset Password" />
      <h3 className="text-center text-3xl text-white font-bold mb-8 uppercase">Reset Password</h3>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            New Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={formData.password}
            onChange={handleOnChange}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleOnChange}
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

export default ResetPassword;
