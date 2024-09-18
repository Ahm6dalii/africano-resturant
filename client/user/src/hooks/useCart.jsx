import axios from "axios"
import { useQuery } from "react-query"
import { useSelector } from "react-redux"

const useCart = () => {
    const api = useSelector(state => state.apiLink.link)
    const { data, isLoading, error } = useQuery('cart', async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW9oYW1lZGhhc3NhbiIsImVtYWlsIjoicHVua21vaGFtZWQyMkBnbWFpbC5jb20iLCJ1c2VySWQiOiI2NmU2ZjM2MWEyZDcyZjk5ODU2ZWEyMzIiLCJpYXQiOjE3MjY0MTI0NjZ9._MwgNBWbOyRutO2G8J95IfujppOdgh61tkac_TqiBOE"
        const headers = {
            token
        }
        const response = await axios(`${api}/cart/userCart`, { headers })
        return response?.data
    })
    const cart = data


    return { cart, isLoading, error }
}

export default useCart