import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import CardPrice from '../card-price/CardPrice';
import { useDispatch, useSelector } from 'react-redux';
import DecIncCount from '../Dec-Inc-count/DecIncCount';
import axios from 'axios';
import { addToCart } from '../../../redux/reducers/cartSlice';
import { useMutation, useQueryClient } from 'react-query';
import { motion } from 'framer-motion';

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
  const { mutate: addOrder, error: cartError, isSuccess } = useMutation('addOrder', async ({ itemId, orderData }) => {
    console.log(orderData, "daata");

    const headers = {
      'Content-Type': 'application/json',
      token: `${user}`,
    }
    const response = await axios.post(`${link}/cart/${itemId}`, orderData, { headers })
    console.log(response, "response");
    return response
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('cart')
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
    console.log(orderData);
    addOrder({ itemId, orderData })
  };

  const AddToCard = async (id, data) => {
    setLoading(true)
    axios.post(`${link}/cart/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        token: `${user}`
      }
    })
      .then(({ data }) => {
        setLoading(false)
        setOpenModal(false)
        dispatch(addToCart(data?.items?.length))
        console.log(data);

      }).catch((err) => {
        setLoading(false)
        console.log(err, 'error');

      })
  }

  useEffect(() => {
    setOrderData({ size: selectedPrice, quantity });
  }, [selectedPrice, quantity]);

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
      <motion.button className="w-full py-3 text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-lg text-sm dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
        whileHover={{ scale: 0.9 }}
        onClick={() => setOpenModal(true)}
      >
        {translation.order}
      </motion.button>

      <Modal  className={`${mode=='light'?'':'dark'}`} show={openModal} size="xl" onClose={onCloseModal} popup={true}>

        <div ref={modalRef}>
          <Modal.Header className='dark:bg-gray-300 dark:text-black ' />
          <Modal.Body className='dark:bg-slate-300 dark:text-black' dir={language == 'ar' ? 'rtl' : 'ltr'} >
            <h2 className="text-center font-bold text-xl text-orange-500">{name}</h2>
            <h4 className="font-bold">{translation.selectSize}</h4>
            <div className="flex flex-col mb-5">
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
              <motion.button
                disabled={!selectedPrice || loading}
                onClick={handleOrder}
                whileHover={{ scale: 0.9 }}
                className="w-full text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-20 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              >
                {
                  loading ? <i class="fa-solid fa-spinner fa-spin"></i> : translation.confirm
                }
              </motion.button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
