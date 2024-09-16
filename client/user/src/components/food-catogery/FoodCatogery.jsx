import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Food from '../food/Food';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../loading/Loading';
import Paginations from '../pagination/Pagination';

export default function FoodCatogery() {
    const {link } = useSelector(state => state.apiLink)
    const [data,setData]=useState(null)
    const [dataPagination,setDataPagination]=useState(null)
    const[isloading,setIsLoading]=useState(false)
    const[limit,setLimit]=useState(8)
    const[page,setPage]=useState(1)
    const navigate = useNavigate();


    const { id } = useParams()
    console.log(id);
    
    async function getAllFood(){
      setIsLoading(true)
        axios.get(`${link}/api/foods/cat?category=${id}&limit=${limit}&page=${page}`)
        .then(({data}) =>{
            console.log(data);
            setDataPagination(data)
            setIsLoading(false)
            setData(data?.data)
        }).catch((err)=>{
          console.log(err); 
          setIsLoading(false)    
        })
      }
    useEffect(()=>{
      getAllFood()
    },[page,id])

    useEffect(()=>{
      // getAllFood()
      // navigate(`/menu/${data?data[0]?._id:''}`); 
    },[])
    // useEffect(() => {
    //     // getAllFood()
    //     navigate(`/menu/${data?data[0]?._id:''}`); 
    //   }, [navigate]);
    

  return (
    <>
     <div>FoodCatogery</div>
     {!isloading?<Food data={data}/>:<Loading/>}
      {dataPagination?.totalPages!=1? <Paginations getNext={setPage} currentPage={dataPagination?.page} totalPages={dataPagination?.totalPages}></Paginations>:''}
    </>
  )
}
