import React from 'react'
import { useSelector } from 'react-redux'

const EmptyCard = () => {
    const { translation } = useSelector(state => state.lang)

    return (
        <div className='flex items-center justify-center '><h1 className='text-3xl font-bold'>{translation.noOrderFound}</h1></div>
    )
}

export default EmptyCard