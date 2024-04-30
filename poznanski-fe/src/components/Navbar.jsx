import React, { useContext, useEffect, useState } from "react";
import logo from "/logo.png";
import { FaRegUser } from "react-icons/fa";
import { FiMenu, FiX } from 'react-icons/fi';
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { useTheme } from "../hooks/ThemeContext";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const { user, loading } = useContext(AuthContext);
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
      <li><a href="/" className={`text-${isDarkMode ? 'dark' : 'black'}`}>Home</a></li>
      <li><a href="/menu" className={`text-${isDarkMode ? 'dark' : 'black'}`}>Shop Devices</a></li>

      <li tabIndex={0}>
        <details>
          <summary className={`text-${isDarkMode ? 'dark' : 'black'}`}>Services</summary>
          <ul className={`p-2 ${isDarkMode ? 'dark' : ''}`}>
            <li><a href="/AboutUs" className={`text-${isDarkMode ? 'text-white' : 'white'}`}>About Us</a></li>
            <li><a href="/FAQ" className={`text-${isDarkMode ? 'white' : 'white'}`}>FAQ</a></li>
            <li><a href="/CCNA" className={`text-${isDarkMode ? 'white' : 'white'}`}>CCNA Training</a></li>
          </ul>
        </details>
      </li>
      <li><a href="/order" className={`text-${isDarkMode ? 'dark' : 'black'}`}>Track Order</a></li>
    </>
  );

  return (
    <header className={`max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out ${isDarkMode ? "dark" : ""}`}>
      <div className={`navbar xl:px-24 ${isSticky ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out text-black" : ""}`} >
        <div className="navbar-start">
          <button className="btn btn-square btn-ghost lg:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <a href="/">
            <img src={logo} alt="logo" className="h-8 w-auto" />
          </a>
        </div>
        <div className={`navbar-center ${isMenuOpen ? "flex" : "hidden"} lg:flex`}>
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          <Link to="/cart-page">
            <label tabIndex={0} className="btn btn-ghost  btn-circle lg:flex items-center justify-center mr-3">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="badge badge-sm indicator-item bg-red">{cart.length || 0}</span>
              </div>
            </label>
          </Link>
          {user ? (
            <Profile user={user} />
          ) : (
            <button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn flex items-center gap-2 rounded-full px-6 bg-red text-white">
              <FaRegUser /> Login
            </button>
          )}
          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
