import React from 'react'
import { Outlet } from 'react-router-dom'
import CatogeryTab from '../../components/catogery-tabs/CatogeryTab'

export default function Menu() {
  return <>
<CatogeryTab></CatogeryTab>
   <Outlet></Outlet>
  </>
  
}
