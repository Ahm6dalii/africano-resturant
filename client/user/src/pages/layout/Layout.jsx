import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Footer from '../../components/footer/Footer'
import { Navbaar } from './../../components/navbar/Navbar';
import style from './layout.module.css'
import { Toaster } from 'react-hot-toast';

export default function () {
  const { language } = useSelector(state => state.lang)
  const { mode } = useSelector(state => state.mode)

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className={` font-['Open_Sans'] ${mode == 'light' ? '' : 'dark'}`}>
        <div dir={language == 'ar' ? 'rtl' : 'ltr'} className={`   dark:bg-slate-900 dark:text-white`} >
          <Navbaar></Navbaar>
          <div className={`md:px-15 ${mode == 'light' ? style.bgImgWhite : style.bgImgDark}`}>
            <div className={`min-h-[90vh] container px-15 py-5  m-auto order`}>
              <Outlet></Outlet>
            </div>
          </div>
          <Footer></Footer>
        </div>
      </div>

    </>
  )
}
