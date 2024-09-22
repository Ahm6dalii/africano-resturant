import React from 'react'
import { Outlet } from 'react-router-dom'
import CatogeryTab from '../../components/catogery-tabs/CatogeryTab'
import { useSelector } from 'react-redux';

export default function Menu() {
  const {translation}=useSelector(state=>state.lang)
  return <>
  <dev>
    <p  style={{"fontFamily":"Marhey"}} className="text-5xl font-extrabold    mb-8 text-center">
    {translation.menuRestaurant}
    </p>
  </dev>
<CatogeryTab></CatogeryTab>
   <Outlet></Outlet>
  </>
  
}
