import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../features/product/productSlice";

const Navbar = () => {
  const { products, isLoading, error } = useSelector((state) => state.product);
  console.log(products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = true;

  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = function () {
    setIsMenuOpen((menu) => !menu);
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    if (searchQuery && searchQuery.length > 3) {
      console.log("inside if");
      dispatch(getProducts(searchQuery));
      navigate("/products");
      setSearchQuery("");

      toast(error);
    }
  };

  // useEffect(
  //   function () {
  //     if (searchQuery & (searchQuery.length > 3)) {
  //       dispatch(getProducts(searchQuery));
  //     }
  //   },
  //   [dispatch, searchQuery]
  // );

  return (
    <nav className="w-full max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex flex-grow-1 items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse" onClick={() => setIsMenuOpen(false)}>
          <img src="/e-com-logo.svg" className="h-12" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ShopIQ</span>
        </Link>

        <div className="flex gap-4 flex-grow-2 justify-evenly items-center sm:justify-between">
          {/* Search input */}

          <div className="w-1/2">
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
              <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                <div className="hidden absolute inset-y-0 start-0 items-center pointer-events-none sm:inline-flex ps-4">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full px-2 py-4 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white sm:ps-10 md:text-sm"
                  placeholder="Search Products..."
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:px-4 md:text-sm"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className="flex justify-between items-center gap-4 text-gray-100">
            <div className="block w-full md:inline-flex">
              <ul
                className={`${
                  isMenuOpen ? "absolute top-1/5 right-1/13 bg-gray-900 p-5 rounded-lg font-medium z-10" : "hidden"
                } md:relative md:bg-transparent md:right-0 md:top-0 md:inline-flex md:space-x-8 md:mt-0`}
              >
                <li onClick={() => setIsMenuOpen(false)} className="hover:underline">
                  <Link to="/products">Products</Link>
                </li>
                <li onClick={() => setIsMenuOpen(false)} className="hover:underline">
                  <Link to="/about">About</Link>
                </li>
                <li onClick={() => setIsMenuOpen(false)} className="hover:underline">
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div className="relative">
              <Link to="/cart">
                <ShoppingCartIcon />
                <span className="absolute top-1 -right-3 transform -translate-x-1/2 -translate-y-1/2 text-xs bg-blue-700 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  6
                </span>
              </Link>
            </div>

            {!isAuthenticated && (
              <Link to="/register" className="">
                <PersonAddIcon className="" />
              </Link>
            )}

            <div className="inline-flex md:hidden " onClick={toggleMenu}>
              {isMenuOpen ? <CloseIcon className="" /> : <MenuIcon className="" />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
