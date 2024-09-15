import React, { useEffect, useState } from 'react'
import CardPrice from './card-price/CardPrice';
import CardModal from './card-modal/CardModal';

export default function Card({imaUrl,desc,amount,name,lang ,id}) {
    
     
       
  return (
    <>
<div class="w-full m-auto max-w-sm bg-transparent border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:bg-transparent dark:border-gray-700 ">
    <div class="h-44 relative overflow-hidden group">
        <img class="h-44 object-cover rounded-t-lg w-full" src={imaUrl} alt="product image" />
    <div class="desc bg-opacity-50 dark:bg-opacity-50  -bottom-[100%] transtion  duration-300 start-0 end-0 absolute opacity-0 group-hover:opacity-100 group-hover:bottom-0 text-center py-4 bg-gray-100 dark:bg-gray-700">
        <p class="font-semibold tracking-tight text-gray-100 dark:text-gray-100">{desc[lang]}</p> 
    </div>
    </div>
    <div class="text-center py-2 ">
        <div className='px-2' >

      <CardModal  popup={true} i={id} amount={amount} name={name[lang]}></CardModal>
        </div>
    </div>
    <div class="px-2 pb-2">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900 text-center dark:text-white">{name[lang]}</h5>    
    </div>
</div>
    </>
  )
}

