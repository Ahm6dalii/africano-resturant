import React from 'react'
import { GridLoader } from 'react-spinners'

export default function Loading() {
  return (
    <>
    <div className='flex items-center justify-center h-[70vh]'>
    <GridLoader color='#ea3c20' />    
    </div>
    </>
  )
}
