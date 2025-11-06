import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";

import { useSelector, useDispatch } from "react-redux";
import { registerUser, removeSuccess } from "../features/user/userSlice";
import { removeError } from "../features/user/userSlice";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

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
        toast.error("Unable to Upload, Error reading file");
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
        dispatch(removeSuccess());
        navigate("/login");
      }
    },
    [dispatch, success, navigate]
  );

  return (
    <>
      <PageTitle title="User Registration" />
      <h3 className="text-center text-3xl text-white font-bold mb-8 uppercase">Register</h3>
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
                  <span>Upload a profile picture</span>
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
            {loading ? "Signing Up..." : "Sign Up"}
            {loading && (
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            )}
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
