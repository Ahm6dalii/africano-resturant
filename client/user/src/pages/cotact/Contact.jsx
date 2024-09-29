import React from 'react'
import contactImg from "../../assets/media/restrunt.jpg"
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import MapLocation from '../../components/map-loaction/MapLocation';
import { Helmet } from 'react-helmet-async';


export default function Contact() {
    const { translation } = useSelector(state => state.lang)
    const pVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
        },
    }


    return (

        <div className=" shadow-2xl  border rounded-3xl max-w-7xl mx-auto py-12 px-1">
            <Helmet>
                <title>Contact</title>
                <meta name="description" content="About Page" />
            </Helmet>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-extrabold  text-orange-500 dark:text-orange-200  mb-8 text-center">
                <i className="fa-solid fa-headset pe-3"></i>
                {translation.contactUs}
            </h3>


            <motion.p
                variants={pVariants} initial="hidden" animate="visible"
                transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                className="text-xl  mb-10 text-center leading-relaxed ">
                {translation.contactAd}
            </motion.p>

            <div className="grid  grid-cols-1 md:grid-cols-2 gap-8">

                <div>
                    <motion.div
                        variants={pVariants} initial="hidden" animate="visible"
                        transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}>
                        <h2 style={{ "fontFamily": " Caveat" }} className="text-4xl font-bold  text-red-500 mb-4">
                            {translation.ContactInformation}
                        </h2>
                        <p className="text-lg  leading-loose mb-6">
                            {translation.ContactInformationAd}
                        </p>
                    </motion.div>
                    <motion.ul
                        variants={pVariants} initial="hidden" animate="visible"
                        transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
                        className="text-lg  space-y-4">
                        <strong className='text-red-500 text-2xl' style={{ "fontFamily": " Oswald" }}>{translation.Address}</strong>
                        <li className='pb-3 '><i className="fa-solid fa-location-dot pe-4"></i> {translation.AddressInfo} </li>
                        <hr />
                        <strong className='text-red-500 text-2xl' style={{ "fontFamily": " Oswald" }}>{translation.Phone}</strong>
                        <li>
                            <i className="fa-solid fa-phone pe-4"></i>
                            {translation.PhoneInfo}</li>
                        <hr />
                        <strong className='text-red-500 text-2xl' style={{ "fontFamily": " Oswald" }}>{translation.socialMedia}</strong>
                        <li>
                            <a href="https://www.facebook.com/profile.php?id=100090617247433&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800">
                                <i className="fab fa-facebook-f text-3xl px-2"></i>
                            </a>
                            <a href="https://www.instagram.com/africanopizzapasta?igsh=MTB5MnFwcXJ1Z2Y0eA%3D%3D" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-600">
                                <i className="fab fa-instagram text-3xl px-2"></i>
                            </a>
                        </li>
                    </motion.ul>


                </div>
                <motion.div
                    variants={pVariants} initial="hidden" animate="visible"
                    transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}>
                    <img src={contactImg} alt="Restaurant view" className="w-full h-4/5 object-cover  rounded-t-full shadow-lg shadow-black-900 dark:shadow-red-300 " />

                </motion.div>
            </div>


            <MapLocation></MapLocation>

        </div>

    )
}
