
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import axios from 'axios'
import Card from "./Card";


export default function Home() {
  const api = useSelector(state => state.apiLink.link)

  const { data, isLoading, error } = useQuery('data', async () => {
    const response = await axios(`${api}/api/foods`)
    return response.data
  })
  const foods = data?.data

  if (isLoading) {
    return <h1>Isloading</h1>
  }
  if (error) {
    return <h1>{error}</h1>
  }
  return (
    <>
      <div className="mx-20">

        {foods && foods.map(({ _id, quantity, image, amount }, i) => (
          <Card key={i} _id={_id} quantity={quantity} image={image} amount={amount} />
        ))}


      </div>
    </>
  )
}
