import React from 'react'

export default function DecIncCount({decreaseQuantity,increaseQuantity,quantity}) {
  return (
    <div dir='ltr'  className="flex items-center justify-center space-x-4 mb-2">
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
  )
}
