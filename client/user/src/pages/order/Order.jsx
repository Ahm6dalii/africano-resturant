/* eslint-disable react/no-unknown-property */

import { useSelector } from "react-redux"

import OrderForm from "./OrderForm"
import { div } from "framer-motion/client"
const Order = () => {

    const { mode } = useSelector(state => state.mode)

    return (
        <div className="">
            <div className="flex flex-col items-center justify-center py-6 md:py-10 lg:py-16 xl:py-16 px-4 md:px-8 lg:px-16 xl:px-24 orde">
                <div className="header flex flex-col items-center justify-center">
                    <div className="text-6xl -ml-10"><i className="fa-solid fa-money-check"></i></div>
                    <div className="">
                        <svg width="400" height="180" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 80 Q 60 20, 120 80 T 240 80"
                                stroke={mode === 'light' ? 'red' : 'white'} fill="transparent" stroke-width="3" />
                            <path d="M120 110 C 140 140, 180 140, 200 110 S 260 110, 280 140"
                                stroke={mode === 'light' ? 'red' : 'white'} fill="transparent" stroke-width="2" />
                            <text x="50" y="150" fill={mode === 'light' ? 'red' : 'red'} font-size="40" font-family="Brush Script MT, cursive">
                                Africano Resturant
                            </text>
                        </svg>
                    </div>
                    <h1 className="md:text-4xl md:mx-0 mx-10 font-extrabold">
                        Africano Restaurant, Red Sea City, Egypt
                    </h1>
                </div>
                <div className="form dark:bg-black bg-white min-w-full min-h-96 mt-10 rounded-2xl form-body  dark:border-[#696969] dark:border-8 border-1">
                    <div className="m-10 flex lg:flex-row flex-col  justify-between items-center">
                        <div className="flex flex-col justify-center items-center mb-20 lg:w-3/4 lg:mr-10 ">
                            <h1 className="text-3xl font-bold uppercase dark:text-white text-red-700">Get your Order now</h1>
                            <p className="text-stone-400">Booking request <span className="text-red-500">+88-123-123456</span> or fill out the order form</p>
                            <OrderForm />
                        </div>
                        <div className="dark:bg-[#1c1c1c]  bg-white min-h-96 min-w-72 rounded-2xl dark:border-[#696969] dark:border-4 border-2 p-8 text-center">
                            <div className="flex flex-col">
                                <h1 className="text-2xl uppercase font-extrabold mb-8  dark:text-white text-red-700  ">Contact us</h1>
                                <div className="flex flex-col items-center justify-center space-y-11">
                                    <div>
                                        <h2 className="uppercase text-md font-bold leading-8">booking Request</h2>
                                        <span className="uppercase text-2xl text-red-500 font-bold">+88-123-123456</span>
                                    </div>
                                    <div>
                                        <h3 className="text-md font-bold uppercase leading-8 text-red-700 dark:text-white">Location</h3>
                                        <span className="uppercase text-sm text-stone-400">London 9578, UK</span>
                                    </div>
                                    <div>
                                        <h3 className="text-md font-bold uppercase leading-8 text-red-700 dark:text-white">Opening Time</h3>
                                        <span className="uppercase text-sm text-stone-400">Monday to Sunday</span>
                                    </div>
                                    <div>
                                        <h3 className="text-md font-bold uppercase leading-8 text-red-700 dark:text-white">Opening Days</h3>
                                        <span className="uppercase text-sm text-stone-400">Monday to Sunday</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order