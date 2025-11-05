import React from "react";
import { Link } from "react-router-dom";

const Profile = ({ user }) => {
  const date = new Date(user.createdAt);
  const normalDate = date.toLocaleString().split(",")[0];

  return (
    <>
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

      <div className="flex justify-between items-center">
        <button
          type="button"
          className="inline-flex w-full items-center justify-center rounded-lg border border-blue-600 px-5 py-2.5 text-sm font-medium text-gray-300 hover:bg-blue-600 hover:text-white focus:ring-2 sm:w-auto"
        >
          Change Password
        </button>
        
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
