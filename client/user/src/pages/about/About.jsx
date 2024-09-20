import React from 'react'
import img1 from "../../assets/media/download1.png"
import img2 from "../../assets/media/download2.png"
import img3 from "../../assets/media/download3.png"
import img8 from "../../assets/media/download8.png"



export default function About() {
  return (
    <>
       <div className=" shadow-2xl  border rounded-3xl max-w-7xl mx-auto p-12">
             <h3 style={{"fontFamily":"Marhey"}} className="text-5xl font-extrabold  text-red-00  mb-8 text-center">
              About Us
            </h3>
            <div className='pb-6'>
                  <p style={{"fontFamily":" Caveat"}} className="text-red-500 text-4xl text-center ">
                                  Our Story                   
                  </p>
                  <p style={{"fontFamily":" Oswald"}} className="text-3xl text-center">
                  A luxury restaurant with A rare taste you can’t find anywhere in the red sea.
                            </p>
            </div>
            <div className="grid  grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                             <img src={img8} alt="Restaurant view" className="w-full h-4/5 object-cover  rounded-t-full shadow-lg shadow-black-900 dark:shadow-red-300 " />
                             <p style={{"fontFamily":" Oswald"}} className="text-3xl py-6 text-center">
                             <span style={{"fontFamily":" Oswald"}} className="text-gray-500">master chef</span> Abdo Tarek                            </p>
                    </div>
                    <div>
                            <p style={{"fontFamily":" Caveat"}} className="text-red-500 text-3xl ">
                            Our chef                   
                             </p>
                            <p style={{"fontFamily":" Oswald"}} className="text-3xl">
                            a master chef with 15 years of experience
                            </p>
                            <p className='pt-6 pb-12'>
                            Lorem Ipsum is simply dummy text of the printing and typeset ting industry lorem Ipsum has the industrys standard my text ever since the when an unknown printer.
                            </p>
                            <p style={{"fontFamily":" Caveat"}} className="text-red-500 text-3xl ">
                            Our Future                  
                             </p>
                             <p style={{"fontFamily":" Oswald"}} className="text-3xl">
                             Looking ahead, we are excited to continue evolving our menu with new seasonal offerings, expanding our reach within the community, and creating more memorable experiences for our guests through special events and culinary innovations.
                            </p>

                        
                    </div>
                    
            </div>
            <div className='pb-12'>
                        <p style={{"fontFamily":" Caveat"}} className="text-red-500 text-3xl">
                          Why we best
                        </p>
                        <p style={{"fontFamily":" Oswald"}} className="text-3xl">
                        our Journey started from 2019
                        to serve tasty steaks
                        </p>
              </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 place-content-stretch'>
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
