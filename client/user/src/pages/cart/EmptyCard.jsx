import React from 'react'
import { useSelector } from 'react-redux'
import emptyCart from '../../assets/affricanoImg/shopping.png'
import { Link } from 'react-router-dom'

const EmptyCard = () => {
    const { translation } = useSelector(state => state.lang)

    return (
        <>
        <div className='flex items-center justify-center gap-3'>
        <i class="fa-solid fa-cart-shopping fa-xl" ></i>
            <h1 className='text-3xl font-bold'>{translation.noOrderFound}</h1>
            </div>
      
        <div className='text-center'> 
            <div className='w-72 mx-auto '>
            <img src={emptyCart} className='w-full' alt="Cart empty" />
            </div>
        <Link to='/menu' className="mt-4 bg-orange-400 hover:bg-orange-600 transition text-white py-2 px-4 rounded-lg inline-block">
          {translation.browsMenu}
        </Link>
        </div>
        </>
    )
}

export default EmptyCard