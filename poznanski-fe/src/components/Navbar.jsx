import React, { useContext, useEffect, useState } from "react";
import logo from "/logo.png";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { useTheme } from "../hooks/ThemeContext";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const {user, loading} = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const { isDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <a href="/" className={`text-${isDarkMode ? 'dark' : 'black'}`}>
          Home
        </a>
      </li>
      <li>
        <a href="/menu" className={`text-${isDarkMode ? 'dark' : 'black'}`}>
          Shop Devices
        </a>
      </li>
      <li>
        <a href="/order" className={`text-${isDarkMode ? 'dark' : 'black'}`}>
          Track Order
        </a>
      </li>
      <li tabIndex={0}>
        <details>
          <summary className={`text-${isDarkMode ? 'dark' : 'black'}`}>Services</summary>
          <ul className={`p-2 ${isDarkMode ? 'dark' : ''}`}>
            <li>
              <a href="/AboutUs" className={`text-${isDarkMode ? 'text-white' : 'white'}`}>About Us</a>
            </li>
            <li>
              <a href="/FAQ" className={`text-${isDarkMode ? 'white' : 'white'}`}>FAQ</a>
            </li>
            <li>
              <a href="/CCNA" className={`text-${isDarkMode ? 'white' : 'white'}`}>CCNA Training</a>
            </li>
          </ul>
        </details>
      </li>

    </>
  );
  return (
    <header
      className={`max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out ${isDarkMode ? "dark" : ""}`}
    >
      <div
        className={`navbar xl:px-24 ${
          isSticky
            ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out text-black"
            : ""
        }`} >
        <div className="navbar-start">
          <div className="dropdown justify-between">

            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-64 space-y-3 ${isDarkMode ? 'dark' : 'red'}`}
              style={{ display: isMenuOpen ? "block" : "none" }}
            >
              {navItems}
            </ul>
          </div>
          <a href="/">
            <img src={logo} alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end ">
         {/* shopping cart */}
         <Link to="/cart-page">
         <label
            tabIndex={0}
            className="btn btn-ghost btn-circle  lg:flex items-center justify-center mr-3"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm bg-red text-white indicator-item">{cart.length || 0}</span>
            </div>
          </label>
         </Link>

          {/* login button */}

          { 
            user ? <>
           <Profile user={user}/>
          </> : <button onClick={()=>document.getElementById('my_modal_5').showModal()} className="btn flex items-center gap-2 rounded-full px-6 bg-red text-white">
            <FaRegUser /> Login
          </button>
          }
          <Modal/>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
