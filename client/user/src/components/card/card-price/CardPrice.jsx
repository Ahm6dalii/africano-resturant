import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

export default function CardPrice({size,selectedPrice,handlePriceChange}) {
  const {translation}=useSelector(state=>state.lang)
 

  return (
   <>
    <label className={`${selectedPrice === `${size[0]}`}  text-md font-bold p-1  `}>
        <input 
        className='mx-2'
          type="checkbox" 
          checked={selectedPrice === size[0]} 
          onChange={() => handlePriceChange(size[0])}
        />
        <span className={`${selectedPrice === size[0]?'text-orange-500':''}  `}>{size[0]}</span> : {size[1]} <span className=" font-bold">{translation.egp}</span>
      </label>
   </>
  )
}
