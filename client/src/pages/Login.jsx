import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, removeSuccess } from "../features/user/userSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { removeError } from "../features/user/userSlice";

const Login = () => {
  const { user, loading, error, success, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = function (e) {
    const { id, value } = e.target;

    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    const formData = {
      ...userData,
    };

    dispatch(loginUser({ formData }));
  };

  // Check Error
  useEffect(
    function () {
      if (error) {
        // console.log(error);

        toast(error);
        dispatch(removeError());
      }
    },
    [dispatch, error]
  );

  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/");
      }
    },
    [isAuthenticated, navigate]
  );

  useEffect(
    function () {
      if (success) {
        toast.success("Login Successful");
        dispatch(removeSuccess());
      }
    },
    [dispatch, success]
  );

  return (
    <>
      <PageTitle title="User Login" />
      {loading ? (
        <Loader />
      ) : (
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="mail@gmail.com"
              required
              value={userData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={userData.password}
              onChange={handleChange}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign in
            </button>
          </div>

          <div className="text-center">
            <p id="helper-text-explanation" className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Forgot password?
              <Link to="/password/forgot" className="font-medium text-blue-600 hover:underline dark:text-blue-500 ">
                Reset
              </Link>
            </p>
          </div>

          <div className="text-center">
            <p id="helper-text-explanation" className="text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?
              <Link to="/register" className="font-medium text-blue-600 hover:underline dark:text-blue-500 ">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      )}
    </>
  );
};

export default Login;
