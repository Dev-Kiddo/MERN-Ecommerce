import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userSlice";
import { toast } from "react-toastify";
import Profile from "./Profile";

const UserDashboard = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = function () {
    console.log("Logout successfully");
    dispatch(logoutUser());
    toast.success("Logout successfully");
    navigate("/");
  };

  useEffect(
    function () {
      if (error) {
        toast(error);
      }
    },
    [error]
  );

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
              className={`${
                isOpen ? "text-white border-gray-400" : "text-gray-400 border-gray-500"
              } py-2.5 px-5 me-2 mb-2 text-sm font-medium rounded-full border hover:bg-gray-100 focus:z-10 focus:ring-2 dark:bg-gray-800 dark:hover:text-white dark:hover:bg-gray-700`}
              to="#"
            >
              Admin Dashboard
            </Link>
          )}

          <Link
            className={`${
              isOpen ? "text-white border-gray-400" : "text-gray-400 border-gray-500"
            } py-2.5 px-5 me-2 mb-2 text-sm font-medium rounded-full border hover:bg-gray-100 focus:z-10 focus:ring-2 dark:bg-gray-800 dark:hover:text-white dark:hover:bg-gray-700`}
            to="/myorders"
          >
            Orders
          </Link>

          <Link
            className={`${
              isOpen ? "text-white border-gray-400" : "text-gray-400 border-gray-500"
            } py-2.5 px-5 me-2 mb-2 text-sm font-medium rounded-full border hover:bg-gray-100 focus:z-10 focus:ring-2 dark:bg-gray-800 dark:hover:text-white dark:hover:bg-gray-700`}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Account
          </Link>

          <button
            className={`${
              isOpen ? "text-white border-gray-400" : "text-gray-400 border-gray-500"
            } py-2.5 px-5 me-2 mb-2 text-sm font-medium rounded-full border hover:bg-gray-100 focus:z-10 focus:ring-2 dark:bg-gray-800 dark:hover:text-white dark:hover:bg-gray-700`}
            onClick={handleLogout}
          >
            {loading ? "logging out..." : "Logout"}
          </button>
        </div>

        <div>{isOpen && <Profile user={user} />}</div>
      </div>
    </section>
  );
};

export default UserDashboard;
