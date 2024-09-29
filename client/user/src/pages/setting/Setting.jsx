import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const SettingLink = ({ to, children, isActive }) => (
  <Link
    to={to}

    className={`flex items-center px-4 py-2.5 font-semibold transition-all duration-200 ease-in-out rounded-full   hover:text-orange-700 ${isActive ? 'bg-orange-100   dark:text-orange-900' : ''
      }`}
  >
    {children}
  </Link>
);

export default function Setting() {
  const { translation } = useSelector(state => state.lang);
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { to: "/setting", label: translation?.updateInfo },
    { to: "/setting/update-password", label: translation?.updatePassword },
    { to: "/setting/img-profile", label: translation?.changeImage },
  ];

  return (
    <div className="mt-12  dark:text-white w-full flex flex-col gap-5 px-4 md:px-6 lg:px-8 xl:px-12 md:flex-row text-gray-800 ">
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="About Page" />
      </Helmet>
      <aside className="md:w-1/3 lg:w-1/4 md:border-e md:border-e-black dark:border-e-white ">
        <div className="top-12 p-4">
          <div className="flex justify-between items-center md:block">

            <h2 className="text-2xl  text-black dark:text-orange-200 font-semibold  flex items-center">
              <i className="fas fa-gear mr-3"></i>{translation?.setting}
            </h2>
            <button onClick={toggleMenu} className="md:hidden text-black dark:text-white">
              <Menu size={24} />
            </button>
          </div>
          <nav className={`flex flex-col my-3 gap-2  ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
            {menuItems.map((item) => (
              <SettingLink key={item.to} to={item.to} isActive={pathname === item.to}>
                {item.label}
              </SettingLink>
            ))}
          </nav>
        </div>
      </aside>
      <main className="w-full h-[70vh] md:h-[60vh] py-4 md:w-2/3 lg:w-3/4">
        <Outlet />
      </main>
    </div>
  );
}