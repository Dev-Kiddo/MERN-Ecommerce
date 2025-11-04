import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";

import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../features/user/userSlice";
import { removeError } from "../features/user/userSlice";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

// http://localhost:5173/api/v1/products

const RegisterUser = () => {
  const { user, success, loading, error } = useSelector((state) => state.user);
  // console.log("USER:", user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState("");

  const handleChange = function (e) {
    const { id, files, value } = e.target;

    if (id === "file-upload") {
      const file = files[0];
      // console.log(file);

      if (!file) return; // if no file selected

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        if (reader.readyState === 2) {
          // console.log("File ready:", reader.result);
          setAvatar(reader.result);
        }
      };

      reader.onerror = (err) => {
        console.error("Error reading file:", err.target.error);
      };
    } else {
      setUserData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async function (e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("avatar", avatar);

    dispatch(registerUser({ formData }));
  };

  // Check Error

  useEffect(
    function () {
      if (error) {
        console.log(error);

        toast(error);
        dispatch(removeError());
      }
    },
    [dispatch, error]
  );

  useEffect(
    function () {
      if (success) {
        toast.success("Registration Successful");
        dispatch(removeError());
        navigate("/login");
      }
    },
    [dispatch, success, navigate]
  );

  return (
    <>
      <PageTitle title="User Registration" />
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center mb-5">
          <img className="w-15 h-15 rounded-full object-cover" src={avatar ? avatar : "/images/user-profile-icon.svg"} alt="preview" />
        </div>

        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your username
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Prasanth123"
            required
            value={userData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Prasanth@gmail.com"
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

        <div className="col-span-full mb-5">
          <div className="flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-4">
            <div className="text-center">
              <div className="flex text-sm/6 text-gray-400">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-transparent font-semibold text-blue-500 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-700 hover:text-indigo-300"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" type="file" name="file-upload" className="sr-only" onChange={handleChange} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign Up
          </button>
        </div>

        <div className="text-center">
          <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Already have an account?
            <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500 ">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default RegisterUser;
