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
const FoodDetails = () => {
    const { id } = useParams()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const api = useSelector(state => state.apiLink.link)
    const { data, isLoading, error } = useQuery(['foodDetails', id], async () => {
        const response = await axios(`${api}/api/foods/${id}`);
        return response.data;
    });

    const { data: foodList } = useQuery('data', async () => {
        const response = await axios(`${api}/api/foods`)
        return response.data
    })
    const foods = foodList?.data
    console.log(foods, "foods");

    const food = data;

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
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9oYW1lZGhhc3NhbiIsImVtYWlsIjoicHVua21vaGFtZWQyMkBnbWFpbC5jb20iLCJ1c2VySWQiOiI2NmU2ZjM2MWEyZDcyZjk5ODU2ZWEyMzIiLCJpYXQiOjE3MjY0NDc1OTR9.ADnAyW3p-1WG-R4h2Bul1H2GV8XScE5OZEzMhSPgwyU"
        const headers = { token };
        const response = await axios.post(`${api}/cart/${id}`, { size }, { headers });
        return response;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('cart')
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
            <nav className="flex p-4 px-20 w-full bg-stone-900 justify-between items-center " aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <Link to='/' className="inline-flex items-center text-sm font-medium text-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <Link to='/menu' className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Menu</Link>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{food.name.en}</span>
                        </div>
                    </li>
                </ol>
                <div className="flex space-x-4 px-16">
                    {previousFood && (
                        <>
                            <Tooltip
                                content={
                                    <div
                                        onClick={() => handleNavigate(previousFood._id)}
                                        className="min-w-32 w-40 h-40 flex items-center justify-center space-x-2rounded-lg"
                                        style={{ width: '180px', height: '80px' }}
                                    >
                                        <div className="w-16 h-16 mr-1">
                                            <img
                                                src={previousFood?.image}
                                                className="object-contain w-full h-full rounded-lg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-bold text-md hover:text-yellow-300">
                                                {previousFood?.name.en}
                                            </p>
                                        </div>
                                    </div>
                                }
                                placement="bottom"
                            >
                                <h1 className="bg-red-700 p-1 px-2 rounded-full text-white cursor-pointer">
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
                                                className="object-contain w-full h-full rounded-lg"
                                                alt=""
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-bold text-md hover:text-yellow-300">
                                                {nextFood?.name.en}
                                            </p>
                                        </div>
                                    </div>
                                }
                                placement="bottom"
                            >
                                <h1 className="bg-red-700 p-1 px-2 rounded-full text-white cursor-pointer">
                                    <i className="fa-solid fa-arrow-right"></i>
                                </h1>
                            </Tooltip>
                        </>

                    )}
                </div>
            </nav>
            <div className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {food && <div className="flex flex-col md:flex-row -mx-4">
                        <div className="md:flex-1 px-4">
                            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                <img className="w-full h-full object-cover" src={food?.image || "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"} alt="Product Image" />
                            </div>
                        </div>
                        <div className="md:flex-1 px-4">
                            <h2 className="text-6xl font-bold text-gray-800 dark:text-white mb-2">{food?.name?.en}</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                                ante justo. Integer euismod libero id mauris malesuada tincidunt.
                            </p>
                            <div className="flex mb-4">
                                <div className="mr-4">
                                    <span className="font-bold text-gray-700 dark:text-white mr-2">Price:</span>
                                    <span className="text-gray-600 dark:text-gray-300">${price}</span>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700 dark:text-white mr-2">Category:</span>
                                    <span className="text-gray-600 dark:text-gray-300">In Stock</span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Size:</span>
                                <div className="flex items-center mt-2">
                                    {Object.keys(food.amount).length > 1 ? (
                                        Object.keys(food.amount).map((sizeKey) => (
                                            <button
                                                key={sizeKey}
                                                onClick={() => handleSizeChange(sizeKey)}
                                                className={`bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600 ${size === sizeKey ? "bg-gray-400 dark:bg-gray-600" : ""
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
                            <div>
                                <span className="font-bold text-gray-700 dark:text-white">Food Description:</span>
                                <p className="text-gray-600 dark:text-gray-300 text-md mt-2">
                                    {food?.description?.en}
                                </p>
                            </div>
                            <div className="flex flex-col md:flex-row items-start justify-start mt-4 w-full mr-7">
                                <div className="w-full md:w-auto px-2 flex justify-start">
                                    <button onClick={handleAddToCart} className="w-full md:w-auto bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
                <CustomerReviews id={id} reviews={food?.review} />
                <RelatedProduct />
            </div>

        </>
    )
}

export default FoodDetails