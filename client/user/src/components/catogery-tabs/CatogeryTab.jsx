import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

export default function CatogeryTab() {
    const { translation,language } = useSelector(state => state.lang)
    const {link } = useSelector(state => state.apiLink)
    const [data,setData]=useState(null)
    const navigate = useNavigate();
    const { id } = useParams();
    async function getAllFood(){

        axios.get(`${link}/api/categories`)
        .then(({data}) =>{
            // console.log(data,'dfsdfsdfssd');
            setData(data)
        }).catch((err)=>{
          console.log(err);     
        })
      }


      useEffect(() => {
        getAllFood();
        if (!id) {
            navigate(`/menu/66e5be963dd3a0cb85617de0`);
        }
    }, [id, navigate]);

  return (
    <>
    <ul className='flex flex-wrap flex-row gap-5 mb-4 w-fit m-auto '>
    {data?.map(item=>{
        return  <li  key={data._id} className=' ' title={`${item.name[language]}`} >
            <NavLink to={item._id} className={(({isActive})=>'transition duration-300 p-1 ' +  (isActive?' font-semibold border-b-2 border-b-orange-200   text-orange-500 ':'font-light'))}>{item.name[language]}</NavLink>
      </li>
        
    })}
    </ul>

  </>
  )
}
