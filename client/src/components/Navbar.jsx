import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/ComponentStyles/Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = true;

  const toggleMenu = function () {
    setIsMenuOpen((menu) => !menu);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse" onClick={() => setIsMenuOpen(false)}>
          <img src="/e-com-logo.svg" className="h-12" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ShopIQ</span>
        </Link>

        <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <ul>
            <li onClick={() => setIsMenuOpen(false)}>
              <Link to="/product">Product</Link>
            </li>
            <li onClick={() => setIsMenuOpen(false)}>
              <Link to="/about">About</Link>
            </li>
            <li onClick={() => setIsMenuOpen(false)}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="navbar-icons">
          {/* <div className="search-container">
            <form className="search-form">
              <input type="search" className="search-input" placeholder="Search products" />
              <button>
                <SearchIcon focusable="false" />
              </button>
            </form>
          </div> */}

          <div className="cart-container">
            <Link to="/cart">
              <ShoppingCartIcon className="icon" />
              <span className="cart-badge">6</span>
            </Link>
          </div>

          {!isAuthenticated && (
            <Link to="/register" className="register-link">
              <PersonAddIcon className="icon" />
            </Link>
          )}

          <div className="navbar-hamburger" onClick={toggleMenu}>
            {isMenuOpen ? <CloseIcon className="icon" /> : <MenuIcon className="icon" />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
