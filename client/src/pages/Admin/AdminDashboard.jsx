import React from "react";
import PageTitle from "../../components/PageTitle";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts, removeError } from "../../features/admin/adminSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import DashboardCard from "../../components/DashboardCard";

const AdminDashboard = () => {
  const { loading, error } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(getAdminProducts());
    },
    [dispatch]
  );

  useEffect(
    function () {
      if (error) {
        toast.error(error);
        dispatch(removeError());
      }
    },
    [error, dispatch]
  );

  return (
    <>
      <PageTitle title="Admin Dashboard" />
      <h2 className="text-lg mb-4 font-semibold text-gray-900 dark:text-white sm:text-xl uppercase">Admin Dashboard</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex bg-gray-700 rounded-lg items-start justify-between mb-5">
            <div className="w-40 max-w-40 rounded-lg bg-gray-700 p-4">
              <div className="mb-5">
                <h6 className="text-white text-lg font-semibold leading-4 ps-2">Products</h6>
              </div>

              <ul className="flex-col gap-3 flex">
                <NavLink
                  className={`flex gap-1 cursor-pointer text-gray-200 text-sm font-medium  py-2 ps-2 rounded-lg capitalize underline hover:bg-gray-800 transition-colors focus:bg-gray-800`}
                  to="allproducts"
                >
                  All Products
                </NavLink>

                <Link
                  className="cursor-pointer text-gray-200 text-sm font-medium  py-2 ps-2 rounded-lg capitalize underline hover:bg-gray-800 transition-colors focus:bg-gray-800"
                  to="createproduct"
                >
                  Create Product
                </Link>
              </ul>
            </div>

            <div className="w-40 max-w-40 rounded-lg bg-gray-700 p-4">
              <div className="mb-5">
                <h6 className="text-white text-lg font-semibold leading-4 ps-2">Users</h6>
              </div>

              <ul className="flex-col gap-3 flex">
                <Link
                  className="cursor-pointer text-gray-200 text-sm font-medium  py-2 ps-2 rounded-lg capitalize underline hover:bg-gray-800 transition-colors focus:bg-gray-800"
                  to="allproducts"
                >
                  All Users
                </Link>
              </ul>
            </div>

            <div className="w-40 max-w-40 rounded-lg bg-gray-700 p-4">
              <div className="mb-5">
                <h6 className="text-white text-lg font-semibold leading-4 ps-2">Orders</h6>
              </div>

              <ul className="flex-col gap-3 flex">
                <Link
                  className="cursor-pointer text-gray-200 text-sm font-medium  py-2 ps-2 rounded-lg capitalize underline hover:bg-gray-800 transition-colors focus:bg-gray-800"
                  to="allproducts"
                >
                  All Orders
                </Link>
              </ul>
            </div>

            <div className="w-40 max-w-40 rounded-lg bg-gray-700 p-4">
              <div className="mb-5">
                <h6 className="text-white text-lg font-semibold leading-4 ps-2">Reviews</h6>
              </div>

              <ul className="flex-col gap-3 flex">
                <Link
                  className="cursor-pointer text-gray-200 text-sm font-medium  py-2 ps-2 rounded-lg capitalize underline hover:bg-gray-800 transition-colors focus:bg-gray-800"
                  to="allproducts"
                >
                  All Reviews
                </Link>
              </ul>
            </div>
          </div>

          <div className="w-full">
            <div className="p-4 border-2 border-dashed rounded-lg dark:border-gray-500">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
