
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/card/Card";
import { Button } from "flowbite-react";
export default function Home() {
  const { translation,language } = useSelector(state => state.lang)
  const {link } = useSelector(state => state.apiLink)
  const [data,setData]=useState(null)

  console.log(link);

    async function getAllFood(){
      axios.get(`${link}/api/foods`)
      .then(({data}) =>{
          console.log(data);
          setData(data.data)
      }).catch((err)=>{
        console.log(err);     
      })
    }
  useEffect(()=>{
    getAllFood()
  },[])
  

  return (
    <>
    <div className="grid grid-cols-1  sm:grid-cols-2  md:grid-cols-3  xl:grid-cols-4 gap-4">
      {data?.map((item,index)=> <Card id={index} lang={language} desc={item?.description } name={item?.name} amount={item?.amount} imaUrl={item?.image}></Card>)}      
    </div>

    </>
  )
}
