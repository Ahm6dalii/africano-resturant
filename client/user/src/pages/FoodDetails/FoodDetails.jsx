/* eslint-disable react/no-unknown-property */
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import CustomerReviews from "./SectionsDetails"
import { Button, Tooltip } from "flowbite-react";
import { useEffect, useState } from "react"
import DetailsLoading from "../../components/Skeletion Loading/DetailsLoading"
import RelatedProduct from "./RelatedProduct"
import socket from "../../socket.io/socket"
import toast from 'react-hot-toast';

const FoodDetails = () => {
    const { id } = useParams()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const api = useSelector(state => state.apiLink.link)
    const { translation, language } = useSelector((state) => state.lang);
    const { user } = useSelector((state) => state.auth);
    const { data, isLoading, error } = useQuery(['foodDetails', id], async () => {
        const response = await axios(`${api}/api/foods/${id}`);
        return response.data;
    });

    const { data: foodList } = useQuery('data', async () => {
        const response = await axios(`${api}/api/foods`)
        return response.data
    })
    const foods = foodList?.data


    const food = data;
    // console.log(food, "what i want");

    const currentIndex = foods?.findIndex(f => f._id === id);

    const nextFood = currentIndex !== -1 && currentIndex < foods?.length - 1 ? foods[currentIndex + 1] : null;
    const previousFood = currentIndex > 0 ? foods[currentIndex - 1] : null;

    // Handle navigation to next or previous food
    const handleNavigate = (foodId) => {
        navigate(`/food/${foodId}`);
    };
    const [size, setSize] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if (food) {
            const availableSizes = Object.keys(food.amount);
            setSize(availableSizes[0]);
            setPrice(food.amount[availableSizes[0]]);
        }
    }, [food]);

    const { mutate } = useMutation('addToCart', async ({ id, size }) => {

        const headers = { token: `${user}`, };
        const response = await axios.post(`${api}/cart/${id}`, { size }, { headers });
        return response;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('cart')
            toast.success(translation.addedOrder)

        },
        onError: () => {
            toast.error(translation.failedOrder)

        }
    });

    const handleAddToCart = () => {
        mutate({ id: food._id, size });
    };

    const handleSizeChange = (newSize) => {
        setSize(newSize);
        setPrice(food.amount[newSize]);
    };



    if (isLoading) return <DetailsLoading />
    return (
        <>
                     <h3 style={{"fontFamily":"Marhey"}} className="text-5xl font-extrabold  text-orange-500 dark:text-orange-200 mb-8 text-center">
                     <i class="fa-solid fa-bowl-food pe-2"></i>
             {translation.foodDetails}
            </h3>

            <div className="flex items-end justify-end space-x-4 px-16" dir={language == 'en' ? 'ltl' : 'ltr'}>
                {previousFood && (
                    <>
                        <Tooltip
                            content={
                                <div
                                    onClick={() => handleNavigate(previousFood._id)}
                                    className="min-w-32 w-40 h-40 flex items-center justify-center space-x-2 rounded-lg cursor-pointer"
                                    style={{ width: '180px', height: '80px' }}
                                >
                                    <div className="w-16 h-16 mr-1">
                                        <img
                                            src={previousFood?.image}
                                            className="object-cover w-full h-full rounded-lg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-bold text-md hover:text-yellow-300">
                                            {language === 'en' ? previousFood?.name.en : previousFood?.name.ar}
                                        </p>
                                    </div>
                                </div>
                            }
                            placement="bottom"
                        >
                            <h1 className="bg-red-900 hover:bg-red-600  text-white p-1 px-2 rounded-full  cursor-pointer">
                                <i className="fa-solid fa-arrow-left"></i>
                            </h1>
                        </Tooltip>
                    </>

                )}
                {nextFood && (
                    <>
                        <Tooltip
                            content={
                                <div
                                    onClick={() => handleNavigate(nextFood._id)}
                                    className="min-w-32 w-40 h-40 flex items-center justify-center space-x-2  rounded-lg cursor-pointer"
                                    style={{ width: '180px', height: '80px' }}
                                >
                                    <div className="w-16 h-16 mr-1">
                                        <img
                                            src={nextFood?.image}
                                            className="object-cover w-full h-full rounded-lg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-bold text-md hover:text-yellow-300">
                                            {language === 'en' ? nextFood?.name.en : nextFood?.name.ar}
                                        </p>
                                    </div>
                                </div>
                            }
                            placement="bottom"
                        >
                            <h1 className="bg-red-900 hover:bg-red-600  text-white p-1 px-2 rounded-full  cursor-pointer">
                                <i className="fa-solid fa-arrow-right"></i>
                            </h1>
                        </Tooltip>
                    </>

                )}
            </div>

            <div className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {food && <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                <img className="w-full h-full object-cover" src={food?.image || "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"} alt="Product Image" />
                            </div>
                        </div>
                        
                        <div className="md:flex-1 px-4">
                            <h2 className="text-6xl font-bold text-orange-900 dark:text-orange-200 mb-2">{language === 'en' ? food?.name?.en : food?.name?.ar}</h2>
                            <div>
                                <span className="font-bold text-gray-900 dark:text-white">
                                {translation.foodDescription} </span>
                                <p className="text-gray-900 dark:text-gray-300 text-md mt-2">
                                    {language === 'en' ? food?.description?.en : food?.description?.ar}
                                </p>
                            </div>
                            <div className="flex mb-4 items-center">
                                <div className="mr-4">
                                    <span className="font-bold text-gray-700 dark:text-white mr-2 text-xl">{translation.price}</span>
                                    <span className="text-red-900 dark:text-white text-2xl font-bold px-2">{price}{translation.egp}</span>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700 dark:text-white mr-2 text-xl px-2">{translation.Category}</span>
                                    <span className="text-gray-600 dark:text-gray-300 text-2xl font-semibold">{language === 'en' ? food?.category?.name?.en : food?.category?.name?.ar}</span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300 ">{translation.size}</span>
                                <div className="flex items-center mt-2">
                                    {Object.keys(food.amount).length > 1 ? (
                                        Object.keys(food.amount).map((sizeKey) => (
                                            <button
                                                key={sizeKey}
                                                onClick={() => handleSizeChange(sizeKey)}
                                                className={`bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600 ${size === sizeKey ? "bg-red-200 dark:bg-red-800 border-2 border-red-400" : ""
                                                    }`}
                                            >
                                                {sizeKey}
                                            </button> 
                                        ))
                                    ) : (
                                        <span className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600 ">{Object.keys(food.amount)[0]}</span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex flex-col md:flex-row items-start justify-start md:mt-20 w-full mr-7">
                                <div className="w-full md:w-auto px-2 flex justify-start">
                                    <button onClick={handleAddToCart} className="w-full md:w-56 bg-red-900 hover:bg-red-600  text-white py-2 px-4 rounded-full font-bold  ">
                                              {translation.confirm}                                   
                                     </button>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
                <CustomerReviews id={id} reviews={food?.review} />
                {/* <RelatedProduct /> */}
            </div>

        </>
    )
}

export default FoodDetails