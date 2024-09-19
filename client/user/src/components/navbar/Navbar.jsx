import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { changeMode } from "../../redux/reducers/modeSlice";
import { changeLang } from "../../redux/reducers/languageSlice";
import { style } from "framer-motion/client";
import navStyle from "./navbar.module.css";
import logo from "../../assets/logo/logo-dr.png";
import { LoginModal } from "../modal/login/modal.login";
import { logOutUser } from "../../redux/reducers/userAuthSlice";
import useCart from "../../hooks/useCart";
export function Navbaar() {
  const { mode } = useSelector((state) => state.mode);
  const { translation } = useSelector((state) => state.lang);
  const { user, userInfo } = useSelector((state) => state.auth);
  const { language } = useSelector((state) => state.lang);
  const { num } = useSelector((state) => state.cart);
  const { cart } = useCart()
  console.log(user);

  const dispatch = useDispatch();

  const navLink = [
    { name: translation.home, href: "/" },
    { name: translation.menu, href: "menu" },
    { name: translation.contact, href: "contact" },
    { name: translation.about, href: "about" },
    { name: translation.categories, href: 'categories' },
  ];

  const dropDownLink = [
    { name: translation.setting, href: "setting" },
    { name: translation.userOrders, href: "userOrders/*" },
    { name: translation.updateinfo, href: "updateinfo" },
    { name: translation.updatepass, href: "updatepass" },
    { name: translation.changeimg, href: "changeimg" },
  ];

  const logout = () => {
    dispatch(logOutUser())
  }
  const handleChangeLang = (e) => {
    console.log(e.target.value);
    dispatch(changeLang(e.target.value.toLowerCase()));
  };

  const customTheme = {
    link: {
      base: "block py-2 pl-3 pr-4 md:p-0",
      active: {
        on: "bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-cyan-700",
        off: "border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white",
      },
      disabled: {
        on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
        off: "",
      },
    },
  };

  return (
    <>
      <div className="dark:bg-black bg-zinc-200 shadow">
        <Navbar
          theme={customTheme}
          fluid
          rounded
          className="py-1 container dark:bg-black bg-gray-200  m-auto"
        >
          <Navbar.Brand className="" >
            <img src={logo} className="w-[80px]  " alt="Flowbite React Logo" />
            {/* <span className="self-center whitespace-nowrap text-xl font-semibold  dark:text-white">
             {translation.logo}
            </span> */}

          </Navbar.Brand>
          {user ? <div className="flex md:order-2 ">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  className="me-4"
                  img={userInfo?.image}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm"> {userInfo?.name}</span>
                <span className="block truncate text-sm font-medium">
                  {userInfo?.email}
                </span>
              </Dropdown.Header>

              {dropDownLink.map((dropItem, index) => (
                <NavLink to={dropItem.href}>
                  <Dropdown.Item key={index}>
                    {dropItem.name}
                  </Dropdown.Item>
                </NavLink>
              ))}
              <NavLink to={'/'} onClick={logout}>
                <Dropdown.Item>
                  {translation.logout}
                </Dropdown.Item>
              </NavLink>
            </Dropdown>
            <Navbar.Toggle />

          </div> : <div className="flex md:order-2 items-center gap-4">
            <LoginModal className="flex md:order-2" />
            <Navbar.Toggle />
          </div>}


          <Navbar.Collapse className={`${navStyle[`custom-navbar-collapse`]}`}>
            {navLink.map((navItem, index) => (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? ` ${navStyle.active} dark:text-white`
                    : navStyle.link
                }
                key={index}
                to={navItem.href}
              >
                {navItem.name}
              </NavLink>
            ))}

            <div className="flex gap-3 items-center">
              {/* Language */}
              <select
                className="select py-[1px] px-2 w-[70px]  max-w-xs ms-auto dark:text-black dark:bg-slate-300 cursor-pointer"
                onChange={handleChangeLang}
              >
                <option selected={language == "en"}>EN</option>
                <option selected={language == "ar"}>AR</option>
              </select>

              {/* Dark mood button */}
              <label className="swap swap-rotate mx-2  ">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  checked={mode == "light"}
                  className="theme-controller hidden"
                  onChange={() => { }}
                  value="synthwave"
                  onClick={() =>
                    dispatch(changeMode(mode == "light" ? "dark" : "light"))
                  }
                />

                {
                  mode == "light" && (
                    /* moon icon */
                    <svg
                      className="swap-on h-7 w-7 fill-current text-black  cursor-pointer "
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                  )
                  /* sun icon */
                }
                {mode == "dark" && (
                  <svg
                    className="swap-off h-7 w-7 fill-current cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>
                )}
              </label>

              {/* Cart */}
              {user && <Link to={'/cart'}>
                <div className="relative cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cart?.items?.length > 0 && <span className=" text-orange-500 font-semibold  absolute -top-4 left-1" >{cart?.items?.length}</span>}
                </div>
              </Link>}

            </div>


          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}
