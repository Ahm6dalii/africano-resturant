import { useSelector } from "react-redux";
import "../../Styles/HomeStyle.css";
import image1 from "../../assets/affricanoImg/1.jpg";
import image2 from "../../assets/affricanoImg/2.jpg";
import image3 from "../../assets/affricanoImg/5.jpg";
import { Link } from "react-router-dom";
import h1 from "../../assets/media/h1.png";
import { motion } from "framer-motion"; // Importing motion
import React, { useRef, useState } from "react";
import Food from "../../components/food/Food";
import CatogeryTab from "./../../components/catogery-tabs/CatogeryTab";
import FoodCatogery from "../../components/food-catogery/FoodCatogery";
import axios from "axios";
import About from "./../about/About";
import { Carousel } from "flowbite-react";
import User1 from "../../assets/blog/review-author-1.jpg";
import User2 from "../../assets/blog/review-author-2.jpg";
import User3 from "../../assets/blog/review-author-3.jpg";
import User4 from "../../assets/blog/review-author-5.jpg";
import Contact from "./../cotact/Contact";
import MapLocation from "../../components/map-loaction/MapLocation";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const { translation } = useSelector((state) => state.lang);
  const text = `${translation.heroAfricano}`;

  // Animation settings
  const paragraphVariants = {
    hidden: { opacity: 0, x: -150 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.9, ease: "easeOut" },
    },
  };

  return (
    <>
      <Helmet>
        <title>Africano</title>
        <meta name="description" content="About Page" />
      </Helmet>
      <div className="min-h-screen">
        {/* Main Content */}
        <main className="container mx-auto text-center">
          <h1
            className="text-3xl md:text-5xl font-bold mb-4 text-orange-500 dark:text-orange-200"
          >
            {text.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>

          {/* Animated paragraph */}
          <motion.h2
            id="motion"
            style={{ fontFamily: "Oswald" }}
            className="text-xl md:text-4xl font-bold mb-4"
            initial="hidden"
            animate="visible"
            variants={paragraphVariants}
          >
            {translation.heroDesc}
          </motion.h2>

          <motion.p
            style={{ fontFamily: "Oswald" }}
            className="text-xl mb-8"
            initial="hidden"
            animate="visible"
            variants={paragraphVariants}
          >
            {translation.heroCaption}
          </motion.p>

          <div className="ads grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-8">
            {/* Image Components */}
            <motion.div
              id="dev1"
              className="relative h-64 overflow-hidden"
              whileHover={{ scale: 1.1 }} >
              <svg width="0" height="0">
                <defs>
                  <clipPath id="oval-clip" clipPathUnits="objectBoundingBox">
                    <ellipse cx="0.5" cy="0.5" rx="0.4" ry="0.5" />
                  </clipPath>
                </defs>
              </svg>
              <div
                className="w-full h-full"
                style={{ clipPath: "url(#oval-clip)" }}
              >
                <img
                  src={image1}
                  alt="Restaurant view"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              id="dev1"
              className="relative h-64 overflow-hidden"
              whileHover={{ scale: 1.1 }} >
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <img
                  src={image2}
                  alt="Steak dish"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-orange-400 text-black rounded-full p-2 transform rotate-12">
                <Link to={"/menu"}>
                  <span className="font-bold text-sm">
                    {translation.OrderNow}
                  </span>
                </Link>
              </div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-600 rounded-full transform -rotate-12"></div>
            </motion.div>

            <motion.div
              id="dev1"
              className="relative h-64 overflow-hidden"
              whileHover={{ scale: 1.1 }} >
              <svg width="0" height="0">
                <defs>
                  <clipPath id="wavy-bottom" clipPathUnits="objectBoundingBox">
                    <path d="M 0,0 H 1 V 0.9 Q 0.75 1, 0.5 0.9, 0.25 1, 0 0.9 Z" />
                  </clipPath>
                </defs>
              </svg>
              <div
                className="w-full h-full rounded-t-3xl overflow-hidden"
                style={{ clipPath: "url(#wavy-bottom)" }}
              >
                <img
                  src={image3}
                  alt="Steak close-up"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-2 right-2 bg-yellow-400 text-black p-3 rounded-full">
                <span className="text-xs font-bold">{translation.vistUs}</span>
              </div>
            </motion.div>
          </div>

          {/* about */}
          <About />

          {/* contact */}

          <Contact />
        </main>
      </div>
    </>
  );
}
