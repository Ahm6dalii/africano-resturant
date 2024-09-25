
import { useSelector } from "react-redux"
import  "../../Styles/HomeStyle.css";
import image1 from "../../assets/affricanoImg/1.jpg"
import image2 from "../../assets/affricanoImg/2.jpg"
import image3 from "../../assets/affricanoImg/5.jpg"
import { Link } from "react-router-dom"
import h1 from "../../assets/media/h1.png"
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react'
import Food from '../../components/food/Food'
import CatogeryTab from './../../components/catogery-tabs/CatogeryTab';
import FoodCatogery from '../../components/food-catogery/FoodCatogery';
import axios from 'axios';
import About from './../about/About';
import { Carousel } from "flowbite-react";
import User1 from "../../assets/blog/review-author-1.jpg";
import User2 from "../../assets/blog/review-author-2.jpg";
import User3 from "../../assets/blog/review-author-3.jpg";
import User4 from "../../assets/blog/review-author-5.jpg";
import Contact from './../cotact/Contact';

import MapLocation from "../../components/map-loaction/MapLocation"

export default function Home() {
  const {translation}=useSelector(state=>state.lang)



  return  <>
 <div className="min-h-scree">
    

      {/* Main Content */}
     
  

      <main className="container mx-auto  text-center">
      <h1 style={{"fontFamily":"Marhey"}} className="text-5xl font-bold mb-4 text-orange-500 dark:text-orange-200">{translation.heroAfricano}</h1>
        <h2 style={{"fontFamily":"Oswald"}} className="text-4xl font-bold mb-4">{translation.heroDesc}</h2>
        
        <p style={{"fontFamily":" Oswald"}} className="text-xl mb-8">{translation.heroCaption}</p>
        
      <div className="ads grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-8">
          {/* Oval image with more pronounced curvature */}
          <div className="relative h-64 overflow-hidden">
            <svg width="0" height="0">
              <defs>
                <clipPath id="oval-clip" clipPathUnits="objectBoundingBox">
                  <ellipse cx="0.5" cy="0.5" rx="0.4" ry="0.5" />
                </clipPath>
              </defs>
            </svg>
            <div className="w-full h-full" style={{clipPath: 'url(#oval-clip)'}}>
              <img src={image1} alt="Restaurant view" className="w-full h-full object-cover" />
            </div>
          </div>
          
          {/* Circular image with decorative elements */}
          <div className="relative h-64">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <img src={image2} alt="Steak dish" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-orange-400 text-black rounded-full p-2 transform rotate-12">
              <Link to={"/menu"}>
              <span className="font-bold text-sm">{translation.OrderNow}</span>
              </Link>
            </div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-600 rounded-full transform -rotate-12"></div>
          </div>
          
          {/* Rounded rectangle image with wavy bottom */}
          <div className="relative h-64 overflow-hidden">
            <svg width="0" height="0">
              <defs>
                <clipPath id="wavy-bottom" clipPathUnits="objectBoundingBox">
                  <path d="M 0,0 H 1 V 0.9 Q 0.75 1, 0.5 0.9, 0.25 1, 0 0.9 Z" />
                </clipPath>
              </defs>
            </svg>
            <div className="w-full h-full rounded-t-3xl overflow-hidden" style={{clipPath: 'url(#wavy-bottom)'}}>
              <img src={image3} alt="Steak close-up" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-2 right-2 bg-yellow-400 text-black p-3 rounded-full">
              <span className="text-xs font-bold">{translation.vistUs}</span>
            </div>
          </div>
        </div>




       


        {/* about */}
        <About/>

        {/* contact */}
        <Contact/>

        
        
       
      </main>
      {/* <MapLocation/> */}
    </div>

    </>
  
}
