/* eslint-disable no-unused-vars */
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import {  useState } from 'react';
import { changeLang } from '../../redux/reducers/languageSlice';
import ReactCountryFlag from "react-country-flag"

export default function LanuageButton() {
    const { language } = useSelector((state) => state.lang);
  const [currentLang, setCurrentLang] = useState(language);

  const dispatch = useDispatch();
  const handleLangChange = (lang) => {
    dispatch(changeLang(lang));
    setCurrentLang(lang);
  };


  return (
    <Menu as="div" className="relative block me-auto dark:text-black ">
      <div>
        <MenuButton className="inline-flex me-auto  justify-center gap-x-1.5 rounded-md bg-[transparent] px-1 py-2 text-sm font-semibold  shadow-sm ">
          <span className=" dark:text-white flex gap-2 items-center">
                       {language=="en"?<ReactCountryFlag countryCode='US' svg />:<ReactCountryFlag countryCode='EG' svg />} 
          {language=="en"?currentLang.toUpperCase():"العربية"}


          </span>
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
      >
        <div className="py-1">
          <MenuItem>
            <span
              onClick={() => handleLangChange('en')}
              className="flex items-center justify-center gap-2 cursor-pointer px-9 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              <ReactCountryFlag countryCode='US' svg />
              EN
            </span>
          </MenuItem>
          <MenuItem>
            <span
              onClick={() => handleLangChange('ar')}
              className="flex items-center justify-center gap-2  cursor-pointer px-9 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
             <ReactCountryFlag countryCode='EG' svg />
              العربية
            </span>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}