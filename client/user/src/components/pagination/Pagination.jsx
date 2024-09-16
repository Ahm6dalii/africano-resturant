import React from 'react'

import { Pagination } from "flowbite-react";
import { useState } from "react";

export default function Paginations({current,totalPages ,getNext}) {
    const [currentPage, setCurrentPage] = useState(current?current:1);
    if(!totalPages)totalPages=1

    const onPageChange = (page) => {setCurrentPage(page),getNext(page)};
  return <>
  <div className="flex overflow-x-auto sm:justify-center">
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  </>
}
