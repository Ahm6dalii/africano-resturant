import React, { useState, useEffect } from 'react';
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { changeMode } from "../../redux/reducers/modeSlice";
import { logOutUser } from "../../redux/reducers/userAuthSlice";
import useCart from "../../hooks/useCart";
import socket from "../../socket.io/socket";
import NotificationsModel from './../Notifications/NotificationsModel';
import LanuageButton from "../LanguageButton/LanguageButton";
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import logoLight from "../../assets/logo/logo.li.png"
import logoDark from "../../assets/logo/logo-dr.png"
import Order from './../../pages/order/Order';
import { LoginModal } from './../modal/login/Modal.login';

export function Navbaar() {
  const [isOpen, setIsOpen] = useState(false);
  const { mode } = useSelector((state) => state.mode);
  const { translation } = useSelector((state) => state.lang);
  const { user, userInfo } = useSelector((state) => state.auth);
  const { cart } = useCart();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit('register', userInfo?.userId);
    return () => {
      socket.off('register');
    }
  }, [userInfo]);

  const navLink = [
    { name: translation.home, href: "/" },
    { name: translation.menu, href: "menu" },
    { name: translation.contact, href: "contact" },
    { name: translation.about, href: "about" },
    { name: translation.categories, href: 'categories' },
  ];

  const dropDownLink = [
    { name: translation.setting, href: "setting" },
    { name: translation.myOrders, href: "allOrders/*" },
  ];

  const logout = () => {
    dispatch(logOutUser());
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <Navbar dir='ltr' rounded className="py-2 px-4 bg-white dark:bg-black shadow-md">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Navbar.Brand as={Link} to="/" className="flex items-center">
          <img src={mode === "dark" ? logoDark : logoLight} className="h-10 mr-3" alt="Logo" />
        </Navbar.Brand>
        <div className="flex items-center md:order-2">
          <LanuageButton />
          <button
            onClick={() => dispatch(changeMode(mode === "light" ? "dark" : "light"))}
            className="text-gray-500 ms-1 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm inline-flex items-center mr-2"
          >
            {mode === "dark" ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
            )}
          </button>
          {user ? (
            <>
              <NotificationsModel />
              <Link to="/cart" className="relative p-1 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cart?.items?.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-orange-600 rounded-full">{cart.items.length}</span>
                )}
              </Link>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt="User settings" img={userInfo?.image} rounded />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm font-medium truncate">{userInfo?.name}</span>
                  <span className="block text-sm font-medium truncate text-gray-500 dark:text-gray-400">{userInfo?.email}</span>
                </Dropdown.Header>
                {dropDownLink.map((item, index) => (
                  <Dropdown.Item className='text-nowrap' key={index} as={Link} to={item.href}>
                    {item.name}
                  </Dropdown.Item>
                ))}
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout}>
                  <span className='flex items-center gap-2'> 
                    {translation.logout}
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  </span>
                </Dropdown.Item>
              </Dropdown>
            </>
          ) : (
            <LoginModal/>
          )}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-1 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <HiX className="w-5 h-5" /> : <HiMenuAlt3 className="w-5 h-5" />}
          </button>
        </div>
        <AnimatePresence>
          {(isOpen || window.innerWidth > 768) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="items-center justify-between w-full md:flex md:w-auto md:order-1"
              id="mobile-menu"
            >
              <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
                {navLink.map((item, index) => (
                  <li className='w-full text-center' key={index}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `block py-2 pl-3 pr-4 flex-1 ${
                          isActive
                            ? "text-white  bg-orange-700 md:bg-transparent md:text-orange-700 dark:text-white"
                            : "text-gray-900 hover:bg-orange-100 md:hover:bg-transparent md:hover:text-orange-700 dark:text-white dark:hover:bg-orange-700 dark:hover:bg-opacity-30 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        } rounded md:p-0 transition-colors duration-200`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                        <span className='text-nowrap'>
                    {item.name}
                    </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Navbar>
  );
}