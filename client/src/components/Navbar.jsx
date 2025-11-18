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
import { getProducts, removeError } from "../features/product/productSlice";

const Navbar = () => {
  const { products, isLoading, error } = useSelector((state) => state.product);
  // console.log(products);

  const { cartItems } = useSelector((state) => state.cart);

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = function () {
    setIsMenuOpen((menu) => !menu);
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    // console.log(searchQuery);

    const trimQuery = searchQuery.trim();

    if (trimQuery && trimQuery.length > 2) {
      navigate(`/products?keyword=${trimQuery}`);
      setSearchQuery("");
    } else {
      dispatch(getProducts({ customError: "Please enter valid query" }));
      navigate(`/products`);
    }
  };

  useEffect(
    function () {
      toast(error);

      // dispatch(removeError());
    },
    [error, dispatch]
  );

  return (
    <nav className="w-full max-w-7xl mx-auto p-4 shadow-md shadow-gray-600/20 rounded-lg">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex flex-grow-1 mr-4 items-center sm:mb-0 space-x-3 rtl:space-x-reverse" onClick={() => setIsMenuOpen(false)}>
          <img src="https://res.cloudinary.com/dnbswhvko/image/upload/v1763435054/e-com-logo_c4ux9k.svg" className="h-9 sm:h-12" alt="Logo" />
          <span className="hidden self-center text-2xl font-semibold whitespace-nowrap dark:text-white sm:inline-flex">ShopIQ</span>
        </Link>

        <div className="flex sm:gap-4 flex-grow-2 justify-evenly items-center sm:justify-between">
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
                  isMenuOpen ? " fixed top-1/9 right-1/30 bg-gray-900 p-5 rounded-lg font-medium z-10 drop-shadow-neutral-300 " : "hidden"
                } md:relative md:bg-transparent md:right-0 md:top-0 md:inline-flex md:space-x-8 md:mt-0`}
              >
                <li onClick={() => setIsMenuOpen(false)} className="hover:underline">
                  <Link className="text-sm" to="/products">
                    Products
                  </Link>
                </li>
                <li onClick={() => setIsMenuOpen(false)} className="hover:underline">
                  <Link className="text-sm" to="/about">
                    About
                  </Link>
                </li>
                <li onClick={() => setIsMenuOpen(false)} className="hover:underline">
                  <Link className="text-sm" to="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="relative">
              <Link to="/cart">
                <ShoppingCartIcon />
                <span className="absolute top-1 -right-3 transform -translate-x-1/2 -translate-y-1/2 text-xs bg-blue-700 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </Link>
            </div>

            {!isAuthenticated && (
              <Link to="/register" className="">
                <PersonAddIcon className="" />
              </Link>
            )}

            {isAuthenticated && (
              <Link to="/dashboard" className="">
                <img className="w-25 rounded-full object-cover sm:w-24 md:w-20" src={user ? user?.avatar?.url : "/images/user-profile-icon.svg"} alt={user && user.name} />
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
