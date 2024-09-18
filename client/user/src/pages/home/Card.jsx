/* eslint-disable react/prop-types */
import axios from "axios"
import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Card = ({ _id, quantity, amount }) => {
    const [size, setSize] = useState('')
    const queryClient = useQueryClient()

    const availableSizes = Object.keys(amount);
    useEffect(() => {
        setSize(availableSizes[0]);
    }, [])
    console.log(size, "size");

    const api = useSelector(state => state.apiLink.link)
    const { mutate } = useMutation('addToCart', async (id) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9oYW1lZGhhc3NhbiIsImVtYWlsIjoicHVua21vaGFtZWQyMkBnbWFpbC5jb20iLCJ1c2VySWQiOiI2NmU2ZjM2MWEyZDcyZjk5ODU2ZWEyMzIiLCJpYXQiOjE3MjY0MTI0NjZ9._MwgNBWbOyRutO2G8J95IfujppOdgh61tkac_TqiBOE"
        const headers = {
            token
        }
        const response = await axios.post(`${api}/cart/${id}`, { size }, { headers })
        console.log(response, "response");
        return response
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('cart')
        }
    })
    const handleAddtoCart = (id, amount) => {
        mutate(id, amount)
        console.log(id, "_id");
    }

    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`food/${_id}`}>foodDetails</Link>
            <span >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{_id}</h5>
            </span>
            {amount && Object.entries(amount).map(([key, value]) => (<h5 key={key} className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{key} : {value}</h5>))}

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            <button onClick={() => handleAddtoCart(_id, amount)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {quantity}
            </button>
        </div>
    )
}

export default Card