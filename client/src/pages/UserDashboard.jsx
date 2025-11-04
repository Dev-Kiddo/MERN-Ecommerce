import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const UserDashboard = ({ user }) => {
  const handleLogout = function () {
    console.log("Logout successfully");
  };
  return (
    <section className="relative pt-36 pb-24">
      <img src="/images/profile-banner.jpg" alt="cover-image" className="w-full absolute top-0 left-0 z-0 h-60 object-cover rounded-xl" />
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-center relative z-10 mb-2.5">
          <img
            src={user ? user?.avatar?.url : "/images/user-profile-icon.svg"}
            alt="user-avatar-image"
            className="w-50 h-50 border-4 border-solid border-white rounded-full object-cover"
          />
        </div>

        <h3 className="text-center font-manrope font-bold text-3xl leading-10 text-gray-300 mb-3 capitalize">Hello, {user?.name}</h3>

        <div className="flex justify-between items-center mt-10 text-gray-300">
          {user.role === "admin" && (
            <Link
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-1 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-700"
              to="/admin/dashboard"
            >
              Admin Dashboard
            </Link>
          )}

          <Link
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-1 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-700"
            to="/orders/user"
          >
            Orders
          </Link>

          <Link
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-1 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-700"
            to="/profile"
          >
            Account
          </Link>

          <button
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-1 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
