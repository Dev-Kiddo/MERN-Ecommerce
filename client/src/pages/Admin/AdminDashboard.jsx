import React from "react";
import PageTitle from "../../components/PageTitle";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts, removeError, removeSuccess } from "../../features/admin/adminSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import DashboardCard from "../../components/DashboardCard";

const AdminDashboard = () => {
  const { loading, success, error } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(getAdminProducts());
    },
    [dispatch]
  );

  useEffect(
    function () {
      if (success) {
        dispatch(removeSuccess());
      }
    },
    [success, dispatch]
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

      <div className="flex flex-col gap-4">
        <div className="flex bg-gray-700 rounded-lg items-start justify-between mb-5">
          <div className="rounded-lg bg-gray-700 p-4">
            <div className="mb-5">
              <h6 className="text-white text-lg font-semibold leading-4 ps-2">Products</h6>
            </div>

            <div>
              <ul className="gap-3 flex">
                <NavLink
                  className={`flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium underline text-white  focus:outline-none focus:ring-2 dark:hover:bg-blue-800`}
                  to="allproducts"
                >
                  All Products
                </NavLink>

                <NavLink
                  className="flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium underline text-white  focus:outline-none focus:ring-2 dark:hover:bg-blue-800"
                  to="createproduct"
                >
                  Create Product
                </NavLink>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="p-4 border-2 border-dashed rounded-lg dark:border-gray-500">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
