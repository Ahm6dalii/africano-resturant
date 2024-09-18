import axios from 'axios'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'

import { Button, Modal } from "flowbite-react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import EmptyCard from './EmptyCard';
export default function Cart() {
  const [openModal, setOpenModal] = useState(false);
  const [openModall, setOpenModall] = useState(false);
  const { cart, isLoading, error } = useCart()
  const [currentItem, setCurrentItem] = useState(null);
  const api = useSelector(state => state.apiLink.link)
  const queryClient = useQueryClient()

  const { mutate: updateCart, error: cartError, isSuccess } = useMutation('updateCart', async ({ id, size, quantity }) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9oYW1lZGhhc3NhbiIsImVtYWlsIjoicHVua21vaGFtZWQyMkBnbWFpbC5jb20iLCJ1c2VySWQiOiI2NmU2ZjM2MWEyZDcyZjk5ODU2ZWEyMzIiLCJpYXQiOjE3MjY0NDc1OTR9.ADnAyW3p-1WG-R4h2Bul1H2GV8XScE5OZEzMhSPgwyU"
    const headers = {
      token
    }
    const response = await axios.post(`${api}/cart/update-quantity/${id}`, { size, quantity }, { headers })

    console.log(response, "response");
    return response
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('cart')
    }
  })
  const { mutate: deleteItem } = useMutation('deleteItem', async ({ id, size }) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9oYW1lZGhhc3NhbiIsImVtYWlsIjoicHVua21vaGFtZWQyMkBnbWFpbC5jb20iLCJ1c2VySWQiOiI2NmU2ZjM2MWEyZDcyZjk5ODU2ZWEyMzIiLCJpYXQiOjE3MjY0NDc1OTR9.ADnAyW3p-1WG-R4h2Bul1H2GV8XScE5OZEzMhSPgwyU"
    const headers = {
      token
    }
    console.log(size);

    const response = await axios.post(`${api}/cart/delete/${id}`, { size }, { headers })
    console.log(response, "response");
    return response
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('cart')
    }
  })
  const { mutate: deleteOrder } = useMutation('deleteItem', async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9oYW1lZGhhc3NhbiIsImVtYWlsIjoicHVua21vaGFtZWQyMkBnbWFpbC5jb20iLCJ1c2VySWQiOiI2NmU2ZjM2MWEyZDcyZjk5ODU2ZWEyMzIiLCJpYXQiOjE3MjY0NDc1OTR9.ADnAyW3p-1WG-R4h2Bul1H2GV8XScE5OZEzMhSPgwyU"
    const headers = {
      token
    }
    const response = await axios.delete(`${api}/cart`, { headers })
    console.log(response, "response");
    return response
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('cart')
    }
  })

  const handleQuantityChange = (id, size, quantity) => {
    if (quantity > 0) {
      updateCart({ id, size, quantity })
    }
  }
  const handleDeleteItem = (id, size) => {
    deleteItem({ id, size })
    setOpenModal(false)
  }
  const handleDeleteCart = () => {
    deleteOrder()
    setOpenModall(false)
  }
  console.log(cart?.items, 'cart')
  if (isLoading) return <h1>isloadning</h1>
  if (error) return <h1>Error: {error.message}</h1>;
  return (
    <section className="py-24 relative">
      {cart.items.length > 0
        ? <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto bg-white dark:bg-black p-4 dark:border-gray-700 dark:border-8 border-1 rounded-2xl">
          <div className='flex justify-between mb-8'>
            <h2 className="ml-12 title font-manrope font-bold text-4xl leading-10 text-center text-black dark:text-white flex-grow">
              Order
            </h2>
            <button className='rounded-lg bg-gradient-to-r from-red-400 to-red-800 hover:bg-red-900 dark:hover:bg-gray-700 p-4' onClick={() => setOpenModall(true)}>Empty Order</button>
          </div>
          <div className="hidden lg:grid grid-cols-3 py-6">
            <div className="font-normal text-xl leading-8 text-gray-500 dark:text-gray-300">Product</div>
            <p className="ml-10 font-normal text-xl leading-8 text-gray-500 dark:text-gray-300 flex items-center justify-between col-span-2">
              <span className="w-full max-w-[370px] text-center">Size</span>
              <span className="mr-8 w-full max-w-[350px] text-center">Quantity</span>
              <span className="pr-15 w-full max-w-[200px] text-center">Total</span>
              <span className="w-full max-w-[200px] text-center">-</span>
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 border-t border-gray-200 dark:border-gray-700 py-6">
            {cart && cart.items && cart?.items.map((item, i) => (
              <div key={i} className="flex flex-col lg:flex-row gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                <div className="img-box">
                  <img src={item.image || "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTNjG7QqZS3X6zYSWUFYyq-wLcZjaDL5sUz8bpfOZ39phir1_Sy0U-FDBq8BDM3u-Ls"} alt={item.name.en} className="w-full lg:w-[200px] xl:w-[340px] xl:h-[200px] rounded-xl" />
                </div>
                <div className="pro-data min-w-48 flex items-start flex-col justify-center">
                  <h5 className="font-semibold text-xl leading-8 text-black dark:text-white text-center lg:text-left">{item.name.en}</h5>
                  <h6 className="font-medium text-lg leading-8 text-indigo-600 text-center lg:text-left">${item.amount}</h6>
                </div>
                <div className="flex items-center flex-col lg:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                  <h6 className="font-manrope font-bold text-2xl leading-9 text-black dark:text-white w-full max-w-[176px] text-center">
                    {item.size}
                  </h6>
                  <div className="flex items-center w-full mx-auto justify-center">
                    <button disabled={item.quantity <= 1} onClick={() => handleQuantityChange(item._id, item.size, item.quantity - 1)} className="group rounded-l-full px-6 py-[18px] border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 dark:hover:bg-gray-600 hover:bg-gray-50">
                      <svg className="stroke-gray-900 dark:stroke-white transition-all duration-500 group-hover:stroke-black dark:group-hover:stroke-gray-300" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </button>
                    <input type="text" value={item.quantity} readOnly className="border-y border-gray-200 dark:border-gray-700 outline-none text-gray-900 dark:text-white font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent" />
                    <button onClick={() => handleQuantityChange(item._id, item.size, item.quantity + 1)} className="group rounded-r-full px-6 py-[18px] border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 dark:hover:bg-gray-600 hover:bg-gray-50">
                      <svg className="stroke-gray-900 dark:stroke-white transition-all duration-500 group-hover:stroke-black dark:group-hover:stroke-gray-300" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                  <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">${item.amount * item.quantity}</h6>
                  <button className='bg-red-700 dark:bg-gray-700 font-manrope font-bold text-lg rounded-lg leading-9 w-full max-w-[176px] text-center' onClick={() => {
                    setOpenModal(true);
                    setCurrentItem(item);
                  }}>Remove</button>
                </div>
                {/* Modal for removing individual item */}
                <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                  <Modal.Header />
                  <Modal.Body>
                    <div className="text-center">
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to remove <span className='text-red-700 font-bold'>{currentItem?.name.en}?</span>
                      </h3>
                      <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={() => handleDeleteItem(item._id, item.size)}>
                          {"Yes, I'm sure"}
                        </Button>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                          No, cancel
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
                {/* Modal for emptying the entire order */}
                <Modal show={openModall} size="md" onClose={() => setOpenModall(false)} popup>
                  <Modal.Header />
                  <Modal.Body>
                    <div className="text-center">
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to remove the entire order?
                      </h3>
                      <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={handleDeleteCart}>
                          {"Yes, I'm sure"}
                        </Button>
                        <Button color="gray" onClick={() => setOpenModall(false)}>
                          No, cancel
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
            <div className="flex items-center justify-between w-full mb-6">
              <p className="font-normal text-xl leading-8 text-gray-400 dark:text-gray-300">Sub Total</p>
              <h6 className="font-semibold text-xl leading-8 text-gray-900 dark:text-white">${cart.totalPrice}</h6>
            </div>
            <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200 dark:border-gray-700">
              <p className="font-normal text-xl leading-8 text-gray-400 dark:text-gray-300">Delivery Charge</p>
              <h6 className="font-semibold text-xl leading-8 text-gray-900 dark:text-white">$15.00</h6>
            </div>
            <div className="flex items-center justify-between w-full py-6">
              <p className="font-manrope font-medium text-2xl leading-9 text-gray-900 dark:text-white">Total</p>
              <h6 className="font-manrope font-medium text-2xl leading-9 text-gray-900 dark:text-white">${cart.totalPrice + 15}</h6>
            </div>
            <button className="bg-red-700 dark:bg-gray-700 py-4 w-full rounded-lg text-lg font-semibold leading-9 text-white transition-all duration-300 hover:bg-gray-900">
              Proceed to Checkout
            </button>
          </div>
        </div>
        : <EmptyCard />}
    </section>

  )
}
