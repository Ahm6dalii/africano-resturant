import React, { useEffect, useState } from 'react'
import CardModal from './card-modal/CardModal';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"; // Importing motion


export default function Card({ imaUrl, desc, amount, name, lang, id }) {



  return (
    <>
      <motion.div 
       whileHover={{ scale: 1.05 }} 
      className="w-full  m-auto max-w-sm bg-transparent border  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:bg-transparent  dark:border-gray-700 ">
        <Link to={`/food/${id}`}>
          <div className="h-44 relative overflow-hidden group ">
            <img className="h-44 object-cover rounded-t-lg w-full" src={imaUrl} alt="product image" />
            {desc[lang] && <div className="desc bg-black bg-opacity-50 dark:bg-opacity-50  -bottom-[100%] transtion  duration-300 start-0 end-0 absolute opacity-0 group-hover:opacity-100 group-hover:bottom-0 text-center py-4  dark:bg-gray-700">
              <p className="font-semibold tracking-tight text-gray-100 dark:text-gray-100">{desc[lang]}</p>
            </div>}
          </div>
        </Link>
        <div className="text-center py-2 ">
          <div className='px-2' >
            <CardModal popup={true} i={id} itemId={id} amount={amount} name={name[lang]}></CardModal>
            
          </div>
        </div>
        <div className="px-2 pb-2">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 text-center dark:text-white">{name[lang]}</h5>
        </div>
      </motion.div>
    </>
  )
}

