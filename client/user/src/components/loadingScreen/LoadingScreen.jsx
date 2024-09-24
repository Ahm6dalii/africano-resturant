import React from 'react'
import './LoadingScreen.css'
import logo  from '../../assets/logo/logo-dr.png'
export default function LoadingScreen() {

  return (
    <div className='bg-slate-900  h-[100vh] flex justify-center items-center'>
            <img src={logo} className="w- animation " alt="Flowbite React Logo" />
     </div>
  )
}
