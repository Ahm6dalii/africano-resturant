import React, { useEffect } from 'react'

export default function CardPrice({size,selectedPrice,handlePriceChange}) {
 

  return (
   <>
    <label className={`${selectedPrice === `${size[0]}`?'border border-red-500':''}  text-md font-bold p-1 text-gray-900 dark:text-white`}>
        <input 
        className='mx-2'
          type="checkbox" 
          checked={selectedPrice === size[0]} 
          onChange={() => handlePriceChange(size[0])}
        />
        <span className={`${selectedPrice === size[0]?'text-green-500':'text-gray-900'}  dark:text-white`}>{size[0]}</span> : {size[1]} <span className="text-green-500 font-bold">EGP</span>
      </label>
   </>
  )
}
