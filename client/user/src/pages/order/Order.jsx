/* eslint-disable react/no-unknown-property */

import { useSelector } from "react-redux"

import OrderForm from "./OrderForm"
import { div } from "framer-motion/client"
import { Helmet } from "react-helmet-async"
const Order = () => {
    const { mode } = useSelector(state => state.mode)
    const { translation, language } = useSelector(state => state.lang)

    return (
        <div className="">
            <Helmet>
                <title>Order</title>
                <meta name="description" content="About Page" />
            </Helmet>
            <div className="flex flex-col items-center justify-center py-6 md:py-10 lg:py-16 xl:py-16 px-4 md:px-8 lg:px-16 xl:px-24 orde">
                <div className="header flex flex-col items-center justify-center">
                    <div className="text-6xl -ml-10"><i className="fa-solid fa-money-check"></i></div>
                    <div className="">
                        <svg width="400" height="180" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 80 Q 60 20, 120 80 T 240 80"
                                stroke={mode === 'light' ? 'red' : 'white'} fill="transparent" strokeWidth="3" />
                            <path d="M120 110 C 140 140, 180 140, 200 110 S 260 110, 280 140"
                                stroke={mode === 'light' ? 'red' : 'white'} fill="transparent" strokeWidth="2" />
                            <text x={language == 'en' ? "50" : "250"} y={language == 'en' ? "170" : "175"} fill={mode === 'light' ? 'red' : 'red'} fontSize="40" fontFamily="Brush Script MT, cursive">
                                {translation.affricanoName}
                            </text>
                        </svg>
                    </div>
                    <h1 className="md:text-4xl md:mx-0 mx-10 font-extrabold">
                        {translation.affricanoAdrress}
                    </h1>
                </div>
                <div className="form dark:bg-[#1c1c1c] dark:bg-opacity-80 bg-white bg-opacity-40 min-w-full min-h-96 mt-10 rounded-2xl form-body  dark:border-[#696969] dark:border-2 border-1">
                    <div className="m-10 flex lg:flex-row flex-col  justify-between items-center">
                        <div className="flex flex-col justify-center items-center mb-20 lg:w-3/4 lg:mr-10 ">
                            <h1 className="text-3xl font-bold uppercase dark:text-white text-red-700">{translation.getOrder}</h1>
                            <p className="text-stone-400">{translation.booking} <span className="text-red-500">01020142743</span>{translation.orOrder} </p>
                            <OrderForm />
                        </div>
                        <div className="dark:bg-[#1c1c1c]  bg-white bg-opacity-40 min-h-96 min-w-72 rounded-2xl dark:border-[#696969] dark:border-4 border-2 p-8 text-center">
                            <div className="flex flex-col">
                                <h1 className="text-2xl uppercase font-extrabold mb-8  dark:text-white text-red-700  ">{translation.orderContact}</h1>
                                <div className="flex flex-col items-center justify-center space-y-11">
                                    <div>
                                        <h2 className="uppercase text-md font-bold leading-8">{translation.orderReq}</h2>
                                        <span className="uppercase text-2xl text-red-500 font-bold">01020142743</span>
                                    </div>
                                    <div>
                                        <h3 className="text-md font-bold uppercase leading-8 text-red-700 dark:text-white">{translation.orderLocation}</h3>
                                        <span className="uppercase text-sm text-stone-400">{translation.orderAddress}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-md font-bold uppercase leading-8 text-red-700 dark:text-white">{translation.orderOpenning}</h3>
                                        <span className="uppercase text-sm text-stone-400">{translation.orderDay}</span>
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