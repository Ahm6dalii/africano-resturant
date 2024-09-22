import React from 'react'
import img1 from "../../assets/media/download1.png"
import img2 from "../../assets/media/download2.png"
import img3 from "../../assets/media/download3.png"
import img8 from "../../assets/media/download8.png"
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux';

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
             <h3 style={{"fontFamily":"Marhey"}} className="text-5xl font-extrabold  text-red-00  mb-8 text-center">
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
                             <img src={img8} alt="Restaurant view" className="w-full h-4/5 object-cover  rounded-t-full shadow-lg shadow-black-900 dark:shadow-red-300 " />
                             <p style={{"fontFamily":" Oswald"}} className="text-3xl py-6 text-center">
                             <span style={{"fontFamily":" Oswald"}} className="text-gray-500">{translation.masterChef}</span> {translation.chefName}</p>
                    </div>
                    <div>
                            <motion.div variants={pVariants} initial="hidden" animate="visible"
                                        transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}>
                              <p style={{"fontFamily":" Caveat"}} className="text-red-500 text-3xl ">
                              {translation.ourChef}                   
                              </p>
                              <p style={{"fontFamily":" Oswald"}} className="text-3xl">
                              a master chef with 5 years of experience
                              </p>
                              <p className='pt-6 pb-12'>
                              Lorem Ipsum is simply dummy text of the printing and typeset ting industry lorem Ipsum has the industrys standard my text ever since the when an unknown printer.
                              </p>
                            </motion.div>
                            <motion.div variants={pVariants} initial="hidden" animate="visible"
                                        transition={{ delay: 1.3, duration: 1, ease: "easeOut" }}>
                              <p style={{"fontFamily":" Caveat"}} className="text-red-500 text-3xl ">
                              Our Future                  
                              </p>
                              <p style={{"fontFamily":" Oswald"}} className="text-3xl">
                              Looking ahead, we are excited to continue evolving our menu with new seasonal offerings, expanding our reach within the community, and creating more memorable experiences for our guests through special events and culinary innovations.
                              </p>
                            </motion.div>

                        
                    </div>
                    
            </motion.div>
            <div className='pb-12'>
                        <p style={{"fontFamily":" Caveat"}} className="text-red-500 text-3xl">
                          Why we best
                        </p>
                        <p style={{"fontFamily":" Oswald"}} className="text-3xl">
                        our Journey started from 2019
                        to serve tasty steaks
                        </p>
              </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 place-content-stretch'
            >
                    <div className='pb-2'>
                        <img src={img1} alt="Restaurant view" className="pb-6 " />
                        <p className='text-2xl pb-3' style={{"fontFamily":" Oswald"}}>
                        premium services
                        </p>
                        <p>
                        From personalized recommendations to exclusive tastings, our premium services ensure an unforgettable culinary journey tailored just for you.
                        </p>

                    </div>
                    <div className='pb-2'>
                       <img src={img2} alt="Restaurant view" className="pb-6 " />
                       <p className='text-2xl pb-3' style={{"fontFamily":" Oswald"}}>
                       Free home delivery
                       </p>
                       <p>
                       Enjoy the luxury of having gourmet meals delivered straight to your doorstep, with no extra cost—savor convenience without compromise.
                       </p>

                    </div>
                    <div className='pb-2'>
                        <img src={img3} alt="Restaurant view" className="pb-6 " />
                        <p className='text-2xl pb-3' style={{"fontFamily":" Oswald"}}>
                        Prime location
                        </p>
                        <p>
                        Nestled in the heart of the city, our establishment offers easy access, ensuring you’re never far from the finest tastes and experiences.
                        </p>

                    </div>
               </div>
               <div>






               </div>



        </div>  
    
    
    
    
    
    </>
  )
}
