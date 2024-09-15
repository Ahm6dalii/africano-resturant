import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import CardPrice from '../card-price/CardPrice';

export default function CardModal({ i, amount, name }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const amountArray = Object.entries(amount);
  const [quantity, setQuantity] = useState(1);
  const [orderData, setOrderData] = useState(null);

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
  };

  useEffect(() => {
    setOrderData({ selectedPrice, quantity });
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
      <Button
        className="w-full text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-lg text-sm dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
        onClick={() => setOpenModal(true)}
      >
        Toggle modal
      </Button>

      <Modal show={openModal} size="xl" onClose={onCloseModal} popup={true}>
        <div ref={modalRef}>
          <Modal.Header />
          <Modal.Body>
            <h2 className="text-center font-bold text-xl text-orange-500">{name}</h2>
            <h4 className="font-bold">Select Size</h4>
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

            <div className="flex items-center justify-center space-x-4 mb-2">
              {/* Decrease Button */}
              <button
                onClick={decreaseQuantity}
                className="bg-red-300 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
              >
                -
              </button>

              {/* Quantity Display */}
              <span className="text-xl font-bold">{quantity}</span>

              {/* Increase Button */}
              <button
                onClick={increaseQuantity}
                className="bg-orange-200 text-white px-4 py-2 rounded hover:bg-orange-400 transition duration-300"
              >
                +
              </button>
            </div>
            <div className="w-full">
              <Button
                disabled={!selectedPrice}
                onClick={handleOrder}
                className="w-full text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-20 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
              >
                Confirm
              </Button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
