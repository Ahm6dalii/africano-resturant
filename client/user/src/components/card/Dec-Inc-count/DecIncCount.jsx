import React from 'react'

export default function DecIncCount({ decreaseQuantity, increaseQuantity, quantity }) {
  return (
    <div dir='ltr' className="flex items-center justify-center space-x-4 mb-2">
      {/* Decrease Button */}
      <button
        disabled={quantity === 0}
        onClick={decreaseQuantity}
        className={`bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900 transition duration-300 ${quantity === 0 && 'cursor-not-allowed'}`}
      >
        -
      </button>

      {/* Quantity Display */}
      <span className="text-xl dark:text-white font-bold">{quantity}</span>

      {/* Increase Button */}
      <button
        disabled={quantity >= 20}
        onClick={increaseQuantity}
        className={`bg-orange-800 text-white px-4 py-2 rounded hover:bg-orange-900 transition duration-300 ${quantity >= 20 && 'cursor-not-allowed'}`}
      >
        +
      </button>
    </div>
  )
}
