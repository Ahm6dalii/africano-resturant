import React from 'react'
import img1 from "../../assets/media/download1.png"
import img2 from "../../assets/media/download2.png"
import img3 from "../../assets/media/download3.png"
import img8 from "../../assets/media/download8.png"
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux';

import cheif from "../../assets/affricanoImg/chief.png"

///     A luxury restaurant with A rare taste you can’t find anywhere in the red sea.


export default function About() {
  const {translation}=useSelector(state=>state.lang)
  const pVariants={
    hidden :{
      opacity:0,
    },
    visible :{
      opacity:1,
    },
  }
  
  return (
    <>
       <div className=" rounded-3xl max-w-7xl mx-auto p-12">
             <h3 style={{"fontFamily":"Marhey"}} className="text-5xl font-extrabold  text-orange-500 dark:text-orange-200 mb-8 text-center">
             {translation.aboutUs}
            </h3>
            <div className='pb-6'>
                  <p style={{"fontFamily":" Caveat"}} className="text-red-500 text-4xl text-center ">
                  {translation.ourStory}                          
                  </p>
                  <motion.p style={{"fontFamily":" Oswald"}} className="text-3xl text-center"
                   variants={pVariants} initial="hidden" animate="visible"
                   transition={{ delay: 0.4, duration: 1, ease: "easeOut" }} >
                         {translation.luxuryRestaurant} 
                   </motion.p>


            </div>
            <motion.div className="grid  grid-cols-1 md:grid-cols-2 gap-8"
             variants={pVariants} initial="hidden" animate="visible"
             transition={{ delay: .7, duration: 1, ease: "easeOut" }}>
                   <div>
                             <img src={cheif} alt="Restaurant view" className="w-full  object-cover  rounded-t-full dark:shadow-md  dark:shadow-red-300 " />
                    </div>
                    <div>
                            <motion.div variants={pVariants} initial="hidden" animate="visible"
                                        transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}>
                              <p style={{"fontFamily":" Caveat"}} className="text-red-500 text-3xl ">
                                  {translation.ourChef}                  
                              </p>
                              <p style={{"fontFamily":" Oswald"}} className="text-3xl py-6  ">
                                  <span style={{"fontFamily":" Oswald"}} className="text-gray-400 px-2 ">
                                    {translation.masterChef}</span> 
                                  {translation.chefName}
                             </p>
                             <p style={{"fontFamily":" Oswald"}} className="text-3xl">
                                    {translation.masterChefAd}
                              </p>
                            </motion.div>
                            <motion.div variants={pVariants} initial="hidden" animate="visible"
                                        transition={{ delay: 1.3, duration: 1, ease: "easeOut" }}>
                              <p style={{"fontFamily":" Caveat"}} className="text-red-500 text-3xl ">
                                      {translation.ourFuture}                 
                              </p>
                              <p style={{"fontFamily":" Oswald"}} className="text-3xl">
                                     {translation.ourFutureAd} 
                              </p>
                            </motion.div>

                        
                    </div>
                    
            </motion.div>
            <div className='pb-12'>
                        <p style={{"fontFamily":" Caveat"}} className="text-red-500 text-3xl">
                        {translation.weBest} 
                        </p>
                        <p style={{"fontFamily":" Oswald"}} className="text-3xl">
                        {translation.weBestAd} 
                        </p>
              </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 place-content-stretch'
            >
                    <div className='pb-2'>
                        <img src={img1} alt="Restaurant view" className="pb-6 " />
                        <p className='text-2xl pb-3' style={{"fontFamily":" Oswald"}}>
                        {translation.premiumServices} 
                        </p>
                        <p>
                        {translation.premiumServicesAd} 
                        </p>

                    </div>
                    <div className='pb-2'>
                       <img src={img2} alt="Restaurant view" className="pb-6 " />
                       <p className='text-2xl pb-3' style={{"fontFamily":" Oswald"}}>
                       {translation.freeDelivery}
                       </p>
                       <p>
                       {translation.freeDeliveryAd}
                       </p>

                    </div>
                    <div className='pb-2'>
                        <img src={img3} alt="Restaurant view" className="pb-6 " />
                        <p className='text-2xl pb-3' style={{"fontFamily":" Oswald"}}>
                        {translation.PrimeLocation}
                        </p>
                        <p>
                        {translation. PrimeLocationAd}
                        </p>

                    </div>
               </div>
               <div>






               </div>



        </div>  
    
    
    
    
    
    </>
  )
}
