import React, { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal } from "flowbite-react";
import useCart from '../../hooks/useCart';
import EmptyCard from './EmptyCard';
import CartIcon from '../../components/ReactI-cons/CartIcon/CartIcon';
import { Helmet } from 'react-helmet-async';

export default function Cart() {
  const { translation, language } = useSelector((state) => state.lang);
  const [openModal, setOpenModal] = useState(false);
  const [openEmptyCartModal, setOpenEmptyCartModal] = useState(false);
  const { cart, isLoading, error } = useCart();
  const [currentItem, setCurrentItem] = useState(null);
  const api = useSelector(state => state.apiLink.link);
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.auth);

  const updateCart = useMutation(
    async ({ id, size, quantity }) => {
      const headers = { token: user };
      return await axios.post(`${api}/cart/update-quantity/${id}`, { size, quantity }, { headers });
    },
    {
      onSuccess: () => queryClient.invalidateQueries('cart')
    }
  );

  const deleteItem = useMutation(
    async ({ id, size }) => {
      const headers = { token: user };
      return await axios.post(`${api}/cart/delete/${id}`, { size }, { headers });
    },
    {
      onSuccess: () => queryClient.invalidateQueries('cart')
    }
  );

  const deleteOrder = useMutation(
    async () => {
      const headers = { token: user };
      return await axios.delete(`${api}/cart`, { headers });
    },
    {
      onSuccess: () => queryClient.invalidateQueries('cart')
    }
  );

  const handleQuantityChange = (id, size, quantity) => {
    if (quantity > 0) {
      updateCart.mutate({ id, size, quantity });
    }
  };

  const { data: deliveryData } = useQuery('delivery', async () => {
    const response = await axios(`${api}/delivery`);
    return response.data;
  });

  const handleDeleteItem = (id, size) => {
    deleteItem.mutate({ id, size });
    setOpenModal(false);
  };

  const handleDeleteCart = () => {
    deleteOrder.mutate();
    setOpenEmptyCartModal(false);
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">{translation.loading}</div>;
  if (error) return <div className="flex justify-center items-center h-screen">{translation.error}: {error.message}</div>;
  if (!cart?.items?.length) return <EmptyCard />;

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <Helmet>
        <title>Cart</title>
        <meta name="description" content="About Page" />
      </Helmet>
      <div className="flex flex-col items-center  sm:flex-row justify-between  sm:items-center mb-4 sm:mb-8">
        <h1 className="text-orange-500 dark:text-orange-200 text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-0 flex items-center gap-1">
          <CartIcon />{translation.yourCart}
        </h1>
        <Button color="failure" size="sm" className='flex items-center gap-2 mt-2 sm:mt-0' onClick={() => setOpenEmptyCartModal(true)}>
          {deleteOrder.isLoading ? <i className='fa-solid fa-spinner fa-spin'></i> : <span className='flex items-center'><i className='fa-solid fa-trash me-2'></i>{translation.clearCart}</span>}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
        <div className="lg:col-span-2">
          {cart.items.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center border-b border-b-black dark:border-b-white py-2 sm:py-4">
              <img src={item.image || "https://via.placeholder.com/150"} alt={item.name.en} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md mb-2 sm:mb-0 sm:mr-4" />
              <div className="flex-grow text-center sm:text-left">
                <h2 className="text-red-600 text-sm sm:text-lg font-semibold">{language === "en" ? item.name.en : item.name.ar}</h2>
                <p className="text-sm sm:text-md">
                  {translation.size} {language === 'ar' ? (
                    item.size === 'S' ? "صغير" :
                      item.size === 'M' ? "متوسط" :
                        item.size === 'L' ? "كبير" :
                          item.size === 'R' ? "عادي" : ""
                  ) : (item.size)}
                </p>
                <p className="text-sm sm:text-md font-bold">{item.amount}<span className='text-xs sm:text-sm ms-1'>{translation.egp}</span></p>
              </div>
              <div className="flex items-center mt-2 sm:mt-0 mx-1">
                <button className="bg-gray-300 px-2 py-1 rounded text-black hover:bg-gray-400 text-sm" onClick={() => handleQuantityChange(item._id, item.size, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                <span className="mx-2 text-sm">{item.quantity}</span>
                <button className="bg-gray-300 px-2 py-1 rounded text-black hover:bg-gray-400 text-sm" disabled={item.quantity >= 20} onClick={() => handleQuantityChange(item._id, item.size, item.quantity + 1)}>+</button>
              </div>
              <Button color="failure" size="xs" className="mt-2 sm:mt-0 sm:ml-2 flex items-center" onClick={() => {
                setCurrentItem(item);
                setOpenModal(true);
              }}>
                {deleteItem.isLoading ? <i className='fa-solid fa-spinner fa-spin'></i> : <span className='flex items-center'><i className='fa-solid fa-trash me-1'></i> {translation.remove}</span>}
              </Button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1 mt-4 lg:mt-0">
          <div className="bg-gray-100 dark:bg-black shadow border p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-3">{translation.orderSummary}</h2>
            <div className="flex justify-between mb-2 text-sm">
              <span>{translation.subTotal}</span>
              <span>{cart.totalPrice}<span className='ms-1'>{translation.egp}</span></span>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span>{translation.delivery}</span>
              <span>{deliveryData?.price}<span className='ms-1'>{translation.egp}</span></span>
            </div>
            <div className="flex justify-between font-bold text-md mt-3">
              <span>{translation.total}</span>
              <span>{cart.totalPrice + parseInt(deliveryData?.price)}<span className='ms-1'>{translation.egp}</span></span>
            </div>
            <Link to="/order" className="block mt-4">
              <Button color="dark" className="w-full text-sm"><span className='flex items-center gap-2'><i className="fa-regular fa-money-bill-1"></i>{translation.processOrder}</span></Button>
            </Link>
          </div>
        </div>
      </div>

      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-4 text-lg font-normal dark:text-white">
              {translation.removeItem} <span className="font-bold text-red-700">{currentItem?.name.en}</span>?
            </h3>
            <div className="flex justify-center gap-3">
              <Button color="failure" size="sm" onClick={() => handleDeleteItem(currentItem._id, currentItem.size)}>{translation.confirmRemove}</Button>
              <Button color="gray" size="sm" onClick={() => setOpenModal(false)}>{translation.cancelRemove}</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={openEmptyCartModal} size="md" onClose={() => setOpenEmptyCartModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
              {translation.removeOrder}
            </h3>
            <div className="flex justify-center gap-3">
              <Button color="failure" size="sm" onClick={handleDeleteCart}>{translation.confirmRemove}</Button>
              <Button color="gray" size="sm" onClick={() => setOpenEmptyCartModal(false)}>{translation.cancelRemove}</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}