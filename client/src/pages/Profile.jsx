import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { removeSuccess, updatePassword } from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.user);
  const focusForm = useRef(null);
  const date = new Date(user.createdAt);
  const normalDate = date.toLocaleString().split(",")[0];

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdatePassword = function () {
    dispatch(updatePassword({ formData }));
  };

  const handleOnChange = function (e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(
    function () {
      if (isOpen) {
        focusForm.current.focus();
      }
    },
    [isOpen]
  );

  useEffect(
    function () {
      if (success) {
        toast.success("Password Updated Successfully");
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
      {isOpen ? (
        <div id="toast-simple" className="p-8 my-8 space-x-4 rounded-lg shadow-sm text-gray-400 bg-gray-700">
          <button onClick={() => setIsOpen((prev) => !prev)} className="mb-4 bg-blue-600 px-3 py-2 rounded-lg text-white hover:bg-blue-800">
            &larr; Back
          </button>

          <div className="flex items-center w-full mb-4">
            <label className="w-full">Old Password:</label>
            <input
              ref={focusForm}
              type="text"
              id="oldPassword"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formData.oldPassword}
              onChange={handleOnChange}
            />
          </div>

          <div className="flex items-center w-full mb-4">
            <label className="w-full">New Password:</label>
            <input
              type="text"
              id="newPassword"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formData.newPassword}
              onChange={handleOnChange}
            />
          </div>

          <div className="flex items-center w-full">
            <label className="w-full">Confirm password:</label>
            <input
              type="text"
              id="confirmPassword"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formData.confirmPassword}
              onChange={handleOnChange}
            />
          </div>
        </div>
      ) : (
        <div id="toast-simple" className="p-8 my-8 space-x-4 rounded-lg shadow-sm text-gray-400 bg-gray-700">
          <div className="flex items-center w-full mb-4">
            <label className="w-full">User Name:</label>
            <input
              type="text"
              id="disabled-input"
              className="bg-gray-100 border capitalize border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={user.name}
              disabled
            />
          </div>

          <div className="flex items-center w-full mb-4">
            <label className="w-full">Email:</label>
            <input
              type="text"
              id="disabled-input"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={user.email}
              disabled
            />
          </div>

          <div className="flex items-center w-full">
            <label className="w-full">Joined At:</label>
            <input
              type="text"
              id="disabled-input"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={normalDate}
              disabled
            />
          </div>
        </div>
      )}

      <div className="flex justify-between items-center gap-5">
        {isOpen ? (
          <button
            type="button"
            className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-2 sm:w-auto"
            onClick={handleUpdatePassword}
          >
            Update Password
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex w-full items-center justify-center rounded-lg border border-blue-600 px-5 py-2.5 text-sm font-medium text-gray-300 hover:bg-blue-600 hover:text-white focus:ring-2 sm:w-auto"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Change Password
          </button>
        )}

        <Link
          type="button"
          className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-2 sm:w-auto"
          to="/updateuser"
        >
          <svg className="-ms-0.5 me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
            ></path>
          </svg>
          Edit your data
        </Link>
      </div>
    </>
  );
};

export default Profile;
