import React from 'react'
import { Outlet } from 'react-router-dom'
import CatogeryTab from '../../components/catogery-tabs/CatogeryTab'
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

export default function Menu() {
  const { translation } = useSelector(state => state.lang)
  return <>
    <Helmet>
      <title>Menu</title>
      <meta name="description" content="About Page" />
    </Helmet>
    <div>
      <p className="flex items-center gap-2 justify-center text-2xl sm:text-3xl  md:text-5xl font-extrabold   text-orange-500 dark:text-orange-200 mb-8 text-center">
        <i className="fa-brands fa-readme"></i>
        {translation.menuRestaurant}
      </p>
    </div>
    <CatogeryTab></CatogeryTab>
    <Outlet></Outlet>
  </>

}
