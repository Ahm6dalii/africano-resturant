import React, { useEffect } from 'react'

import { Pagination } from "flowbite-react";
import { useState } from "react";
import { useParams } from 'react-router-dom';

export default function Paginations({current,totalPages ,getNext}) {
    const [currentPage, setCurrentPage] = useState(current?current:1);
    const {id}= useParams()
    if(!totalPages)totalPages=1  
    const onPageChange = (page) => {setCurrentPage(page),getNext(page)};
    useEffect(()=>{
      setCurrentPage(1)
    },[id])
  return <>
  <div className="flex overflow-hidden m-auto w-fit sm:justify-center " dir="ltr">
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  </>
}
