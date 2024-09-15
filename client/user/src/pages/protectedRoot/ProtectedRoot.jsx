

import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoot({children}) {

    if(localStorage.getItem('user')!==null){
        return children
    }else{
        return <Navigate to="/"></Navigate>
    }
}
