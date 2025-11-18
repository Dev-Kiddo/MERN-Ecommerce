import React, { useState, useEffect, useRef } from "react";
import PageTitle from "../components/PageTitle";

import Loader from "../components/Loader";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { removeSuccess, updateUser } from "../features/user/userSlice";
import { toast } from "react-toastify";

const UpdateProfile = ({ user }) => {
  // console.log(user);
  const dispatch = useDispatch();

  const { user: userData, success, loading, error } = useSelector((state) => state.user);

  // console.log(userData, loading, error);

  const formFocus = useRef(null);

  const [formData, setformData] = useState({
    name: user?.name,
    email: user?.email,
  });

  const [avatar, setAvatar] = useState(user?.avatar.url);

  const handleOnChange = function (e) {
    const { id, files, value } = e.target;

    if (id === "file-upload") {
      const file = files[0];

      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        reader.readyState === 2;
        setAvatar(reader.result);
      };

      reader.onerror = (err) => {
        toast.error("Unable to Upload, Error reading file");
        console.error("Error reading file:", err.target.error);
      };
    } else {
      setformData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    // console.log(avatar);

    const payload = new FormData();

    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("avatar", avatar);

    // console.log("formData");

    dispatch(updateUser({ formData: payload }));
  };

  useEffect(function () {
    formFocus.current.focus();
  }, []);

  useEffect(
    function () {
      if (success) {
        toast.success("Profile Updated Successfully");
        dispatch(removeSuccess());
      }
    },
    [success, dispatch]
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
      <PageTitle title="Update Profile" />
      <h3 className="text-center text-3xl text-white font-bold mb-8 uppercase">Update Profile</h3>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center mb-5">
          <img className="w-15 h-15 rounded-full object-cover" src={avatar} alt="preview" />

          <div className="flex text-sm/6 mt-2 text-gray-400">
            <label className="relative cursor-pointer rounded-md bg-transparent font-semibold text-blue-500 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-700 hover:text-indigo-300">
              <span>Update profile picture</span>
              <input id="file-upload" type="file" name="file-upload" className="sr-only" onChange={handleOnChange} />
            </label>
          </div>
        </div>

        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </label>
          <input
            ref={formFocus}
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={formData?.name}
            onChange={handleOnChange}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            value={formData?.email}
            onChange={handleOnChange}
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? "Updating Profile... " : "Update Profile"}
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
      </form>
    </>
  );
};

export default UpdateProfile;
