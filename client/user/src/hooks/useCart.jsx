import axios from "axios"
import { useQuery } from "react-query"
import { useSelector } from "react-redux"



const useCart = () => {
    const api = useSelector(state => state.apiLink.link)
    const { user } = useSelector((state) => state.auth);

    const { data, isLoading, error } = useQuery('cart', async () => {
        const headers = {
            token: `${user}`
        }
        const response = await axios(`${api}/cart/userCart`, { headers })
        return response?.data
    }, {
        enabled: !!user
    })


    const cart = data


    return { cart, isLoading, error }
}

export default useCart