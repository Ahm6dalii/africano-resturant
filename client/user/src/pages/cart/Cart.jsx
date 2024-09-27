import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal } from "flowbite-react";
import useCart from '../../hooks/useCart';
import EmptyCard from './EmptyCard';
import CartIcon from '../../components/ReactI-cons/CartIcon/CartIcon';
import { useQuery } from 'react-query';

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
    async ({ id, size, }) => {
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
 
const { data } = useQuery('delivery', async () => {
            const responsie = await axios(`${api}/delivery`)
            console.log(responsie,"looool");
            return responsie.data
            
    
    })

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-row sm:flex-row justify-between items-center mb-8">
        <h1 style={{"fontFamily":"Marhey"}} className="text-orange-500 dark:text-orange-200 text-3xl me-auto  p-2   font-bold   sm:mb-0 flex items-center gap-1"><CartIcon></CartIcon>{translation.yourCart}</h1>
        <Button color="failure" className='flex items-center gap-2' onClick={() => setOpenEmptyCartModal(true)}>{deleteOrder.isLoading?<i className='fa-solid fa-spinner fa-spin'></i>:<span className='flex items-center '><i className='fa-solid fa-trash  me-2'></i>{translation.clearCart}</span>}</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.items.map((item, index) => (
            <div key={index} className="flex flex-row sm:flex-row items-center border-b border-b-black dark:border-b-white py-4">
              <img src={item.image || "https://via.placeholder.com/150"} alt={item.name.en} className="w-20 h-20 object-cover rounded-md mb-4 sm:mb-0 sm:mr-4" />
              <div className="flex-grow text-center sm:text-left">
                <h2 className="text-red-600 text-sm sm:text-xl font-semibold">{language === "en"?item.name.en : item.name.ar}</h2>
                <p className="text-md sm:text-xl">{translation.size} {language === 'ar' ? (
                    item.size === 'S' ? "صغير" :
                    item.size === 'M' ? "متوسط" :
                    item.size === 'L' ? "كبير" :
                    item.size === 'R' ? "عادي" :
                    ""
                       ) : (item.size )}
                 </p>
                <p className="sm:text-Xl text-bold">{item.amount}<span className=' text-sm text-bold sm:text-xl ms-2 pl-2'>{translation.egp}</span></p>
              </div>
              <div className="flex items-center mt-4 sm:mt-0 mx-1">
                <button className="bg-gray-300 px-2 rounded text-black hover:bg-gray-400" size="sm"  onClick={() => handleQuantityChange(item._id, item.size, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                <span className="mx-2">{item.quantity}</span>
                <button className="bg-gray-300 px-2 rounded text-black hover:bg-gray-400" size="sm" disabled={item.quantity >= 20}  onClick={() =>  handleQuantityChange(item._id, item.size, item.quantity + 1)}>+</button>
              </div>
              <Button color="failure" size="sm" className="mt-4 sm:mt-0 sm:ml-4 flex items-center" onClick={() => {
                setCurrentItem(item);
                setOpenModal(true);
              }}>{deleteItem.isLoading?<i className='fa-solid fa-spinner fa-spin'></i>:<span className='flex items-center'><i className='fa-solid fa-trash  me-1'></i> {translation.remove}</span>}</Button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1 mt-8 lg:mt-0">
          <div className="bg-gray-100 dark:bg-black shadow border p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{translation.orderSummary}</h2>
            <div className="flex justify-between mb-2">
              <span>{translation.subTotal}</span>
              <span>{cart.totalPrice}<span className=' ms-2'>{translation.egp}</span></span>
            </div>
            <div className="flex justify-between mb-2">
              <span>{translation.delivery}</span>
              <span>{data?.price}<span className=' ms-2'>{translation.egp}</span></span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>{translation.total}</span>
              <span>{cart.totalPrice +parseInt( data?.price)}<span className=' ms-2'>{translation.egp}</span></span>
            </div>
            <Link to="/order" className="block mt-6">
              <Button color="dark" className="w-full "><span className='flex items-center gap-2'><i class="fa-regular fa-money-bill-1 "></i>{translation.processOrder}</span></Button>
            </Link>
          </div>
        </div>
      </div>

      <Modal  show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header  />
        <Modal.Body >
          <div className="text-center ">
            <h3 className="mb-5 text-lg font-normal dark:text-white">
              {translation.removeItem} <span className="font-bold text-red-700">{currentItem?.name.en}</span>?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDeleteItem(currentItem._id, currentItem.size)}>{translation.confirmRemove}</Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>{translation.cancelRemove}</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={openEmptyCartModal} size="md" onClose={() => setOpenEmptyCartModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {translation.removeOrder}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteCart}>{translation.confirmRemove}</Button>
              <Button color="gray" onClick={() => setOpenEmptyCartModal(false)}>{translation.cancelRemove}l</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}