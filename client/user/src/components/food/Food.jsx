import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/card/Card";
import { Button } from "flowbite-react";
import CatogeryTab from '../catogery-tabs/CatogeryTab';
import { Outlet, useParams } from 'react-router-dom';
export default function Food({data}) {
    const { translation,language } = useSelector(state => state.lang)
    const {link } = useSelector(state => state.apiLink)
    console.log(data,'foooood');
    
    // const [data,setData]=useState(null)

    // console.log(id);
  
    //   async function getAllFood(){
    //     axios.get(`${link}/api/foods?limit=100`)
    //     .then(({data}) =>{
    //         console.log(data);
    //         setData(data.data)
    //     }).catch((err)=>{
    //       console.log(err);     
    //     })
    //   }
    // useEffect(()=>{
    //   getAllFood()
    // },[])
    // useEffect(()=>{

    // },[data])
  return (
    <>
    <div className="grid grid-cols-1  sm:grid-cols-2  md:grid-cols-3  xl:grid-cols-4 gap-4">
      {data?.map((item,index)=> <Card key={index} id={item._id} lang={language} desc={item?.description } name={item?.name} amount={item?.amount} imaUrl={item?.image}></Card>)}      
    </div>

    </>
  )
}
