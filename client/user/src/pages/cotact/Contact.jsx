import React from 'react'
import contactImg from "../../assets/media/restrunt.png"
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

export default function Contact() {
    const { translation } = useSelector(state => state.lang)
    const pVariants={
        hidden :{
          opacity:0,
        },
        visible :{
          opacity:1,
        },
      }
    

  return (
  
            <div className=" shadow-2xl  border rounded-3xl max-w-7xl mx-auto p-12">
                <h3 style={{"fontFamily":"Marhey"}} className="text-5xl font-extrabold    mb-8 text-center">
                <i class="fa-solid fa-headset pe-3"></i>
                {translation.contactUs }
                </h3>
                
                
                <p className="text-xl  mb-10 text-center leading-relaxed ">
                        {translation.contactAd }                
                </p>
                
                <div className="grid  grid-cols-1 md:grid-cols-2 gap-8">

                    <motion.div 
                    variants={pVariants} initial="hidden" animate="visible"
                    transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}>
                        <h2 style={{"fontFamily":" Caveat"}} className="text-4xl font-bold  text-red-500 mb-4">
                        {translation.ContactInformation }
                        </h2>
                        <p className="text-lg  leading-loose mb-6">
                        {translation.ContactInformationAd }
                        </p>
                        <ul className="text-lg  space-y-4">
                        <strong className='text-red-500 text-2xl' style={{"fontFamily":" Oswald"}}>{translation.Address }</strong>
                            <li className='pb-3 '><i class="fa-solid fa-location-dot pe-4"></i> {translation.AddressInfo } </li>   
                            <hr />
                        <strong className='text-red-500 text-2xl' style={{"fontFamily":" Oswald"}}>{translation.Phone }</strong>
                            <li>
                            <i class="fa-solid fa-phone pe-4"></i>
                            {translation.PhoneInfo }</li>
                            <hr />
                        <strong className='text-red-500 text-2xl' style={{"fontFamily":" Oswald"}}>{translation.socialMedia }</strong>
                            <li>
                              <a href="https://www.facebook.com/profile.php?id=100090617247433&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
                                  <i className="fab fa-facebook-f text-3xl px-2"></i>
                              </a>
                              <a  href="https://www.instagram.com/africanopizzapasta?igsh=MTB5MnFwcXJ1Z2Y0eA%3D%3D" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-600">
                                  <i className="fab fa-instagram text-3xl px-2"></i>
                              </a> 
                            </li>
                        </ul>

                        
                    </motion.div>
                    <div>
                    <img src={contactImg} alt="Restaurant view" className="w-full h-4/5 object-cover  rounded-t-full shadow-lg shadow-black-900 dark:shadow-red-300 " />
                        
                    </div>
                </div>


                <div className="mt-12">
                    <h2 className="text-3xl font-bold  text-red-500 mb-4 text-center" style={{"fontFamily":" Oswald"}}>
                    <i class="fa-solid fa-location-dot pe-4"></i>
                    {translation.findUs }
                    </h2>
                    <div className="w-full h-64 rounded-lg overflow-hidden shadow-inner">
                        <iframe
                            className="w-full h-full border-0"
                            src="https://www.google.com/maps/embed?pb=Africano+pizza%26pasta/@28.3616322,33.0762066,17z/data=!3m1!4b1!4m6!3m5!1s0x14515fe31fa9a355:0x43fbf4acc0b3a06b!8m2!3d28.3616275!4d33.0787815!16s%2Fg%2F11sw2zwzf4?hl=en-GB&entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D"
                            allowFullScreen=""
                            loading="lazy"
                            title="Google Map"
                        ></iframe>
                    </div>
                </div>
            </div>
        
  )
}
