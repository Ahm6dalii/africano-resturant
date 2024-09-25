import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import CardPrice from '../card-price/CardPrice';
import { useDispatch, useSelector } from 'react-redux';
import DecIncCount from '../Dec-Inc-count/DecIncCount';
import axios from 'axios';
import { addToCart } from '../../../redux/reducers/cartSlice';
import { useMutation, useQueryClient } from 'react-query';
import { setLogin } from '../../../redux/reducers/userAuthSlice';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CardModal({ i, amount, name, itemId }) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const amountArray = Object.entries(amount);
  const [quantity, setQuantity] = useState(1);
  const [orderData, setOrderData] = useState(null);
  const { translation, language } = useSelector((state) => state.lang);
  const { mode } = useSelector(state => state.mode)
  const { link } = useSelector(state => state.apiLink)
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const nagivate=useNavigate()
  const {id}=useParams()
  
  const { mutate: addOrder, error: cartError, isSuccess ,isLoading} = useMutation('addOrder', async ({ itemId, orderData }) => {

    const headers = {
      'Content-Type': 'application/json',
      token: `${user}`,
    }
    const response = await axios.post(`${link}/cart/${itemId}`, orderData, { headers })
    return response
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('cart')
      toast.success( translation.addedOrder)

    },
    onError:()=>{
      toast.error(translation.failedOrder)

    }
  })
  // Create a ref to attach to the modal body
  const modalRef = useRef();

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const handlePriceChange = (size) => {
    setSelectedPrice(size);
  };

  const handleOrder = () => {
  if(user){
    addOrder({ itemId, orderData })}
  else{
    dispatch(setLogin(true))
    nagivate(`/login/menu/${id}`)
    }
  };

 

  useEffect(() => {
    setOrderData({ size: selectedPrice, quantity });
  }, [selectedPrice, quantity]);
  useEffect(() => {
    setOpenModal(loading);
  }, [isSuccess]);

  // Detect click outside of the modal content
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenModal(false);
      }
    };

    // Add the event listener when the modal is open
    if (openModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up the event listener when the modal is closed
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openModal]);

  return (
    <>
      <Button className="w-full text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-lg text-sm dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
        onClick={() => setOpenModal(true)}
      >
        {translation.order}
      </Button>

      <Modal  className={`${mode=='light'?'':'dark'}`} show={openModal} size="xl" onClose={onCloseModal} popup={true}>

        <div ref={modalRef}>
          <Modal.Header className='dark:bg-gray-900 dark:text-black ' />
          <Modal.Body className='dark:bg-gray-900 dark:text-black' dir={language == 'ar' ? 'rtl' : 'ltr'} >
            <h2 className="text-center font-bold text-3xl text-red-900 dark:text-orange-200">{name}</h2>
            <h4 className="font-bold dark:text-orange-200">{translation.selectSize}</h4>
            <div className="flex flex-col mb-5 dark:text-white">
              {amountArray.map((item) => (
                <CardPrice
                  key={item[0]} // Ensure key prop is unique
                  size={item}
                  selectedPrice={selectedPrice}
                  
                  handlePriceChange={handlePriceChange}
                />
              ))}
            </div>

            <DecIncCount increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} quantity={quantity} />

            <div className="w-full">

               <Button
               disabled={!selectedPrice || loading}
               onClick={handleOrder}
               className="w-full text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-20 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
             >
               {
                 isLoading? <i class="fa-solid fa-spinner fa-spin"></i> : translation.confirm
               }
             </Button>
             
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
